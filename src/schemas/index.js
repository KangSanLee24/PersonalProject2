import mongoose from "mongoose";
import { MONGO_URL, MONGO_NAME } from "../constants/env.constant.js";

const connect = () => {
  mongoose
    .connect(MONGO_URL, {
      dbName: MONGO_NAME, // pp2marketplace 데이터베이스명을 사용합니다.
    })
    .then(() => console.log("몽고디비 연결 성공"))
    .catch((err) => console.log(`몽고디비 연결 실패 ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

export { connect };
