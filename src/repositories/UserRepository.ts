import { User } from "../entities/User";
import { Schema, model } from "mongoose";

const UserSchema = new Schema<User>({
  id: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  createdAt: {type: String, required: true},
  updatedAt: {type: String, required: true},
  deletedAt: {type: String, required: false},
  isDeleted: {type: Boolean, required: true}
})

const UserModel = model("User", UserSchema);

export class UserRepository implements IRe {
  public static 
}

// const UserRepository = new MongoRepository<User>(UserModel, options);

// export { UserRepository };

