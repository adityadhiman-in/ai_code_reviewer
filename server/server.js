import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

let Port = 3000;

app.listen(Port, () => {
  console.log(`server running on port http://localhost:${Port}`);
});
