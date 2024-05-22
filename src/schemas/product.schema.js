import mongoose from "mongoose";
import { PRODUCT_STATUS } from "../constants/product.constant.js";

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String, // 상품의 이름을 나타냅니다.
      required: true, // 필수 항목입니다.
      unique: true,
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
      select: false,
    },
    status: {
      type: String, // 상품의 상태를 나타냅니다.
      required: true, // 필수 항목입니다.
      enum: Object.values(PRODUCT_STATUS),
      default: PRODUCT_STATUS.FOR_SALE,
    },
  },
  // timestamps는 몽구스스키마에 찾아보면 있고,
  // toJSON을 호출, 가상으로 만든 속성(_id)
  { timestamps: true, toJSON: { virtuals: true } }
);

// 위에서 정의한 스키마를 이용하여 'Products'라는 이름의 모델을 생성합니다.
export const Product = mongoose.model("Product", ProductsSchema);
