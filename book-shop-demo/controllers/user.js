const { StatusCodes } = require("http-status-codes");
const userModel = require("../models/user");
const {
  generateHashedPassword,
  generateHashedPasswordWithSalt,
} = require("../utils/generate-hashed-password");
const { signToken } = require("../utils/auth");

// 회원가입
const join = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { salt, hashedPassword } = await generateHashedPassword(password);

    await userModel.create({ email, password: hashedPassword, salt });
    res.status(StatusCodes.CREATED).json({ message: "회원가입을 축하합니다." });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "회원가입을 실패했습니다." });
  }
};

// 로그인
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await userModel.login(email);

    if (rows.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "유효하지 않은 로그인 정보입니다." });
    }

    const user = rows[0];
    const hashedPassword = await generateHashedPasswordWithSalt(
      password,
      user.salt
    );
    const isPasswordValid = user.password === hashedPassword;

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "비밀번호를 재입력해주세요." });
    }

    const token = await signToken(user);
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
    const { email, password } = req.body;
    const { salt, hashedPassword } = generateHashedPassword(password);
    await userModel.resetPassword({
      email,
      password: hashedPassword,
      salt,
    });

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

const userController = {
  join,
  login,
  checkUser,
  resetPassword,
};

module.exports = userController;
