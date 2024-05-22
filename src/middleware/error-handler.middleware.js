export const errorHandler = (error, req, res, next) => {
  console.error(err);
  //Joi 에러 유효성검사
  if (error.name === "ValidationError") {
    return res.status(400).json({ errorMessage: error.message });
  } else if (error.name === "CastError") {
    // /products/:productsId에서 Id부분이 틀리면 나옴.
    return res.status(404).json({
      errorMessage: "존재하지 않는 상품입니다.",
    });
  }
  return res
    .status(500)
    .json({ errorMessage: "서버에서 에러가 발생하였습니다." });
};
