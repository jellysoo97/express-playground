const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const {
  generateHashedPassword,
  generateHashedPasswordWithSalt,
} = require("../middlewares/password-encyption");

const userModel = require("../models/user");
const config = require("../config");

const join = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    const hasValidationErrors = !validationErrors.isEmpty();

    if (hasValidationErrors) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.array() });
    }

    const { email, password } = req.body;
    // 비밀번호 암호화
    const { salt, hashedPassword } = generateHashedPassword(password);

    await userModel.create({ email, password: hashedPassword, salt });
    res.status(StatusCodes.CREATED).json({ message: "회원가입을 축하합니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "회원가입을 실패했습니다." });
  }
};

const login = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    const hasValidationErrors = !validationErrors.isEmpty();

    if (hasValidationErrors) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.array() });
    }

    const { email, password } = req.body;
    const [rows] = await userModel.login(email);

    if (rows.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "유효하지 않은 로그인 정보입니다." });
    }

    const user = rows[0];
    // db에 저장된 salt 가지고 다시 암호화
    const hashedPassword = generateHashedPasswordWithSalt(
      user.password,
      user.salt
    );
    // 저장된 암호와 비교
    const isPasswordValid = user.password === hashedPassword;

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "비밀번호를 재입력해주세요." });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwt.privateKey,
      {
        expiresIn: config.jwt.expiresInHour,
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(StatusCodes.OK).json({ message: "환영합니다!" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "로그인을 실패했습니다." });
  }
};

const checkUser = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    const hasValidationErrors = !validationErrors.isEmpty();

    if (hasValidationErrors) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.array() });
    }

    const { email } = req.body;
    const [rows] = await userModel.login(email);

    if (rows.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "유효하지 않은 로그인 정보입니다." });
    }

    const user = rows[0];
    res
      .status(StatusCodes.OK)
      .json({ message: "유효한 로그인 정보입니다.", email: user.email });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "유저 확인을 실패했습니다." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    const hasValidationErrors = !validationErrors.isEmpty();

    if (hasValidationErrors) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.array() });
    }

    const { email, password } = req.body;
    const { salt, hashedPassword } = generateHashedPassword(password);
    // salt도 같이 업데이트
    const [rows] = await userModel.resetPassword({
      email,
      password: hashedPassword,
      salt,
    });

    if (rows.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "유효하지 않은 로그인 정보입니다." });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "비밀번호 변경에 성공했습니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "유저 확인을 실패했습니다." });
  }
};

const authService = {
  join,
  login,
  checkUser,
  resetPassword,
};

module.exports = authService;
