// /schemas/products.schema.js

import mongoose from "mongoose";

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const ProductsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true, // order 필드 또한 필수 요소입니다.
    unique: true,
  },
  name: {
    type: String, // 상품의 이름을 나타냅니다.
    required: true, // 필수 항목입니다.
  },
  description: {
    type: String, // 상품의 상세 설명을 나타냅니다.
    required: false,
  },
  manager: {
    type: String, // 상품의 카테고리를 나타냅니다.
    required: true, // 필수 항목입니다.
  },
  password: {
    type: String, // 상품의 이름을 나타냅니다.
    required: true, // 필수 항목입니다.
  },
  status: {
    type: String, // 상품의 상태를 나타냅니다.
    required: true, // 필수 항목입니다.
    enum: ["FOR_SALE", "SOLD_OUT"],
  },
  createdAt: {
    type: Date, // 상품이 생성된 시간을 나타냅니다.
    required: true, // 필수 항목입니다.
  },
  updateAt: {
    type: Date, // 상품이 수정된 가장 최근 시간을 나타냅니다.
    required: false,
  },
});

// 위에서 정의한 스키마를 이용하여 'Products'라는 이름의 모델을 생성합니다.
export default mongoose.model("Products", ProductsSchema);
