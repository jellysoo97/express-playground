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
  // Map 객체 조회
  let products = {};

  if (db.size) {
    db.forEach((value, key) => {
      products[key] = value;
    });

    res.json(products);

    // res.json(Array.from(db.values()));
  } else {
    res.status(404).send("존재하는 상품이 없습니다.");
  }
});

// 개별 상품 조회
app.get("/products/:id", (req, res) => {
  const product = db.get(+req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("개별 상품 조회에 실패했습니다.");
  }
});

// 상품 등록
app.use(express.json());
app.post("/products/add", (req, res) => {
  const newId = db.size + 1;

  if (req.body && !!req.body.title) {
    db.set(newId, { ...req.body, id: newId });
    console.log(db.get(newId));
    // 등록 성공은 201
    res.status(201).send(`${db.get(newId).title} 상품이 등록되었습니다.`);
  } else {
    // 요청 데이터가 올바르지 않으면 400
    res.status(400).send("요청 값이 유효하지 않습니다.");
  }
});

// 개별 상품 삭제
app.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = db.get(id);

  if (!product) {
    res.status(404).send(`요청하신 ${id} 상품은 없는 상품입니다.`);
    return;
  }

  db.delete(id);
  res.send(`${product.title} 상품이 삭제되었습니다.`);
});

// 전체 상품 삭제
app.delete("/products", (req, res) => {
  if (db.size > 0) {
    db.clear();
    res.send("전체 상품이 삭제되었습니다.");
  } else {
    res.status(404).send("삭제할 상품이 없습니다.");
  }
});

// 개별 상품 수정
app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = db.get(id);

  if (product) {
    db.set(id, { ...product, ...req.body });

    const newProduct = db.get(id);
    res.send(`before: ${product}\nafter: ${newProduct}`);
  } else {
    res.status(404).send("존재하지 않는 상품입니다.");
  }
});
