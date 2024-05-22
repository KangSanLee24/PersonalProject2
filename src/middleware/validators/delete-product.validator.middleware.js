import Joi from "joi";
//Joi 객체 유효성 검사
export const deleteProductValidator = async (req, res, next) => {
  try {
    const joiSchema = Joi.object({
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
