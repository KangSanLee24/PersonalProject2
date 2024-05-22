import Joi from "joi";
import { PRODUCT_STATUS } from "../../constants/product.constant.js";
//Joi 객체 유효성 검사
export const updateProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().min(1).max(20).messages({
        "string.base": "상품명은 문자열이여야 합니다.",
        "any.required": "상품명을 입력해 주세요.",
      }),
      description: Joi.string().messages({
        "string.base": "상품 설명은 문자열이여야 합니다.",
        "any.required": "상품 설명을 입력해 주세요.",
      }),
      manager: Joi.string().min(1).max(20).messages({
        "string.base": "담당자는 문자열이여야 합니다.",
        "any.required": "담당자를 입력해 주세요.",
      }),
      status: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .valid(...Object.values(PRODUCT_STATUS))
        .messages({
          "string.base": "상품 상태는 문자열이여야 합니다.",
          "any.required": "상품 상태를 입력해 주세요.",
          "any.only": "상품 상태는 [FOR_SALE,SOLD_OUT] 중 하나여야 합니다.",
        }),
      password: Joi.string()
        .min(1)
        .max(20)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
          "string.base": "비밀번호는 문자열이여야 합니다.",
          "any.required": "비밀번호를 입력해 주세요.",
        }),
    });

    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
