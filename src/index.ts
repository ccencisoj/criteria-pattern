import dotenv from "dotenv-flow";
import express, { Router } from "express";
import { Database } from "./common/database/Database";
import { UserController } from "./controller/UserController";
import { errorMiddleware } from "./middleware/errorMiddleware";

dotenv.config();

const PORT = process.env.PORT;

(async ()=> {
  const server = express();
  const apiRouter = Router();

  apiRouter.use(express.json());

  apiRouter.post("/users", UserController.createUser);
  apiRouter.put("/users", UserController.updateUser);
  apiRouter.delete("/users", UserController.createUser);

  server.use("/api", apiRouter);
  
  server.use(errorMiddleware);  

  await Database.connect();

  server.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
  })
})()
