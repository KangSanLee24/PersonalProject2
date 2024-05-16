// /src/schemas/index.js

import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(
      "mongodb+srv://sparta-user:asdf4321@cluster0.adaavxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "pp2marketplace", // pp2marketplace 데이터베이스명을 사용합니다.
      }
    )
    .then(() => console.log("몽고디비 연결 성공"))
    .catch((err) => console.log(`몽고디비 연결 실패 ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

export default connect;
