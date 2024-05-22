import express from "express";
import { SEVER_PORT } from "./constants/env.constant.js";
import { productsRouter } from "./routers/products.router.js";
import { connect } from "./schemas/index.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";

const app = express();
connect(); //mongodb연결

//Express에서 req.body에 접근하여 body데이터를 사용할 수 있도록.
app.use(express.json()); //body에 있는거 json으로 바꾸는 기능
app.use(express.urlencoded({ extended: true })); //form으로 들어오는 데이터를 body로 넘겨주는 기능

const router = express.Router();

app.use("/", [router, productsRouter]);

//에러 처리 미들웨어를 등록한다.
app.use(errorHandler);

app.listen(SEVER_PORT, () => {
  console.log(SEVER_PORT, "포트로 서버가 열렸어요!");
});
