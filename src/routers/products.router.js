import express from "express";
import Joi from "joi";
import Products from "../schemas/product.schema.js";

const router = express.Router();

const createdProductsSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  description: Joi.string(),
  manager: Joi.string().min(1).max(20).required(),
  password: Joi.string()
    .min(1)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

// products 상품 등록 API
router.post("/products", async (req, res, next) => {
  try {
    // 클라이언트로부터 전달받은 데이터를 유효성 검사한다.
    const validation = await createdProductsSchema.validateAsync(req.body);

    const { name, description, manager, password } = validation;

    // name 중복되지 않았는지 검사한다. 실제로 MongoDB에 데이터를 조회해서, 해당하는 데이터가 MongoDb에 존재하는 지 확인.
    const products = await Products.find({ name: name }).exec();
    // name이 중복된다면, 에러메시지를 전달한다.
    if (products.length) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "이미 등록된 상품명입니다." });
    }
    const productsMaxOrder = await Products.findOne().sort("-id").exec();
    const id = productsMaxOrder ? productsMaxOrder.id + 1 : 1;

    // 상품(Products)를 생성한다.
    const createdProducts = new Products({
      id: id,
      name: name,
      description: description,
      manager: manager,
      password: password,
      status: "FOR_SALE",
      createdAt: new Date(),
      updateAt: new Date(),
    });
    await createdProducts.save();
    return res.status(201).json({
      status: 201,
      message: "상품 생성에 성공했습니다.",
      data: createdProducts,
    });
  } catch (error) {
    next(error);
  }
});

// products 목록 조회 API - 객체분해, toObject()
router.get("/products", async (req, res, next) => {
  // 최신순으로 가져옴.
  const products = await Products.find().sort("-createdAt").exec();
  //비밀번호만 빼서 따로 저장.
  const noPasswordProducts = products.map((product) => {
    //객체 분해하는거 / toObject는 몽구스 문서를 JS객채로 변환.
    const { password, ...noPasswordProducts } = product.toObject();
    return noPasswordProducts;
  });
  return res.status(200).json({ products: noPasswordProducts });
});

// 상품 상세 조회 API - select(-password)
router.get("/products/:productsId", async (req, res, next) => {
  const { productsId } = req.params;
  const product = await Products.findById(productsId)
    .select("-password")
    .exec();
  return res.status(200).json({ product });
});

// products 상품 수정 API
router.patch("/products/:productsId", async (req, res, next) => {
  //_id값을 받는다.
  const { productsId } = req.params;
  //name, description, manager, status, password를 받는다.
  const { name, description, manager, status, password } = req.body;

  //일치하는 상품이 존재하지 않으면, 404 상품이 존재하지 않습니다.
  const currentProduct = await Products.findById(productsId).exec();
  if (!currentProduct) {
    return res.status(404).json({ errorMessage: "존재하지 않는 상품입니다." });
  } else {
    if (!password) {
      //password가 없으면 401 "비밀번호를 입력해주세요."
      return res.status(401).json({ errorMessage: "비밀번호를 입력해주세요." });
    }
    if (currentProduct.password !== password) {
      //일치하지 않으면, 402 "비밀번호가 일치하지 않습니다."
      return res
        .status(402)
        .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
    }
  }
  // https://mongoosejs.com/docs/api/model.html#Model.find()
  //id password 다 체크되면, 변경된거 저장 + 수정날짜바꾸기
  currentProduct.name = name;
  currentProduct.description = description;
  currentProduct.manager = manager;
  currentProduct.status = status;
  currentProduct.updateAt = new Date();

  await currentProduct.save();
  return res.status(200).json({
    status: 200,
    message: "상품 수정에 성공했습니다.",
    data: currentProduct,
  });
});

// products 상품 삭제 API
router.delete("/products/:productsId", async (req, res, next) => {
  const { productsId } = req.params;
  const { password } = req.body;

  const currentProduct = await Products.findById(productsId).exec();
  if (!currentProduct) {
    return res.status(404).json({ errorMessage: "존재하지 않는 상품입니다." });
  } else {
    if (!password) {
      //password가 없으면 401 "비밀번호를 입력해주세요."
      return res.status(401).json({ errorMessage: "비밀번호를 입력해주세요." });
    }
    if (currentProduct.password !== password) {
      //일치하지 않으면, 402 "비밀번호가 일치하지 않습니다."
      return res
        .status(402)
        .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
    }
  }

  await Products.deleteOne({ _id: productsId }).exec();
  return res.status(200).json({
    status: 200,
    message: "상품 삭제에 성공했습니다.",
    data: {
      id: productsId,
    },
  });
});

// localhost:3000/api/test GET
router.get("/test", (req, res) => {
  res.json("테스트");
});

export default router;
