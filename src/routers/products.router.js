import express from "express";
import Joi from "joi";
import { Product } from "../schemas/product.schema.js";

const productsRouter = express.Router();

//Joi 객체 유효성 검사
const createdProductSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  description: Joi.string(),
  manager: Joi.string().min(1).max(20).required(),
  password: Joi.string()
    .min(1)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

// 상품 등록 API
productsRouter.post("/products", async (req, res, next) => {
  try {
    // 클라이언트로부터 전달받은 데이터를 유효성 검사합니다.
    const validation = await createdProductSchema.validateAsync(req.body);

    const { name, description, manager, password } = validation;

    // name 중복되지 않았는지 검사합니다.
    //실제로 MongoDB에 데이터를 조회해서, 해당하는 데이터가 MongoDb에 존재하는 지 확인합니다.
    const existedProduct = await Product.findOne({ name }).exec();

    // name이 중복된다면, 에러메시지를 전달합니다.
    if (existedProduct) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "이미 등록된 상품명입니다." });
    }

    // 상품(Product)를 생성합니다.
    const createdProduct = new Product({
      name,
      description,
      manager,
      password,
    });
    let data = await createdProduct.save();
    data = { ...data.toJSON(), password: undefined };
    return res.status(201).json({
      status: 201,
      message: "상품 생성에 성공했습니다.",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 목록 조회 API - 객체분해, toObject()
productsRouter.get("/products", async (req, res, next) => {
  try {
    // 최신순으로 가져옵니다.
    const products = await Product.find().sort("-createdAt").exec();
    //비밀번호만 빼서 따로 저장합니다.
    const noPasswordProducts = products.map((product) => {
      //객체 분해하는거 / toObject는 몽구스 문서를 JS객채로 변환합니다.
      const { password, ...noPasswordProducts } = product.toObject();
      return noPasswordProducts;
    });
    return res.status(200).json({
      status: 200,
      message: "상품 목록 조회에 성공했습니다.",
      products: noPasswordProducts,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 상세 조회 API - select(-password)
productsRouter.get("/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .select("-password")
      .exec();
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "존재하지 않는 상품입니다.",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "상품 상세 조회에 성공했습니다.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 수정 API
productsRouter.patch("/products/:productId", async (req, res, next) => {
  try {
    //_id값을 받는다.
    const { productId } = req.params;
    //name, description, manager, status, password를 받는다.
    const { name, description, manager, status, password } = req.body;

    if (!password) {
      return res
        .status(401)
        .json({ status: 401, errorMessage: "비밀번호를 입력해주세요." });
    }

    const product = await Product.findById(productId, {
      password: true,
    }).exec();

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, errorMessage: "존재하지 않는 상품입니다." });
    }

    const isPasswordMatched = password === product.password;

    if (!isPasswordMatched) {
      return res
        .status(402)
        .json({ status: 402, errorMessage: "비밀번호가 일치하지 않습니다." });
    }

    const productInfo = {
      ...(name && { name }),
      ...(description && { description }),
      ...(manager && { manager }),
      ...(status && { status }),
    };

    let data = await Product.findByIdAndUpdate(productId, productInfo, {
      new: true,
    });

    return res.status(200).json({
      status: 200,
      message: "상품 수정에 성공했습니다.",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// products 상품 삭제 API
productsRouter.delete("/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { password } = req.body;

    if (!password) {
      return res
        .status(401)
        .json({ status: 401, errorMessage: "비밀번호를 입력해주세요." });
    }

    const product = await Product.findById(productId, {
      password: true,
    }).exec();

    if (!product) {
      return res
        .status(404)
        .json({ status: 404, errorMessage: "존재하지 않는 상품입니다." });
    }

    const isPasswordMatched = +password === product.password;

    if (isPasswordMatched) {
      return res
        .status(402)
        .json({ status: 402, errorMessage: "비밀번호가 일치하지 않습니다." });
    }

    let data = await Product.findByIdAndDelete(productId).exec();
    return res.status(200).json({
      status: 200,
      message: "상품 삭제에 성공했습니다.",
      data,
    });
  } catch (error) {
    next(error);
  }
});

export { productsRouter };
