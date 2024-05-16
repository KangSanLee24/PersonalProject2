import express from "express";
import productsRouter from "./routers/products.router.js";
import connect from "./schemas/index.js";
import ErrorHandlerMiddleware from "./middleware/error-handler.middleware.js";

const app = express();
const PORT = 3000;
connect(); //mongodb연결

//Express에서 req.body에 접근하여 body데이터를 사용할 수 있도록.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "HI!" });
});

app.use("/api", [router, productsRouter]);

//에러 처리 미들웨어를 등록한다.
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
