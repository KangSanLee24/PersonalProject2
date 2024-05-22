import Joi from "joi";
//Joi 객체 유효성 검사
export const createProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
      name: Joi.string().min(1).max(20).required().messages({
        "string.base": "상품명은 문자열이여야 합니다.",
        "any.required": "상품명을 입력해 주세요.",
      }),
      description: Joi.string().required().messages({
        "string.base": "상품 설명은 문자열이여야 합니다.",
        "any.required": "상품 설명을 입력해 주세요.",
      }),
      manager: Joi.string().min(1).max(20).required().messages({
        "string.base": "담당자는 문자열이여야 합니다.",
        "any.required": "담당자를 입력해 주세요.",
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
