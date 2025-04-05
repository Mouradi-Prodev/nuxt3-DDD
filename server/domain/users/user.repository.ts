import type { User } from "./user.model";

export interface UserRepository {
  findAll(): Promise<User[]>;
}
