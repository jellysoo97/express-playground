const { default: axios } = require("axios");
const express = require("express");
const app = express();

// db
const dummyApiUrl = "https://dummyjson.com";
let db = new Map();

const getAllProducts = async () => {
  try {
    const response = await axios.get(`${dummyApiUrl}/products`);

    return response.data;
  } catch {
    return null;
  }
};

// 서버 시작 후에 데이터 로드하고 라우팅 설정
app.listen(1234, async () => {
  console.log("서버 시작");

  try {
    const data = await getAllProducts();

    if (data) {
      for (let i = 0; i < 10; i++) {
        db.set(i + 1, data.products[i]);
      }

      console.log("데이터 로드 완료");
    }
  } catch {
    console.log("데이터 로드 실패");
  }
});

// api
app.get("/", (req, res) => {
  res.send("상품을 등록하거나 조회해보세요.");
  res.send("/products -> 전체 상품 조회");
  res.send("/products/:id -> 개별 상품 조회");
  res.send("/products/add -> 상품 등록");
});

// 전체 상품 조회
app.get("/products", (req, res) => {
  res.json(Array.from(db.values()));
});

// 개별 상품 조회
app.get("/products/:id", (req, res) => {
  const product = db.get(+req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.send("개별 상품 조회에 실패했습니다.");
  }
});

// 상품 등록
app.use(express.json());
app.post("/products/add", async (req, res) => {
  const newId = db.size + 1;

  db.set(newId, { ...req.body, id: newId });

  console.log(db.get(newId));
  res.send(`${db.get(newId).title} 상품이 등록되었습니다.`);
});
