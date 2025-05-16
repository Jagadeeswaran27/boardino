import { User } from "./auth";

export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  ownerId: string;
  memberIds: string[];
  owner?: Omit<User, "hashedPassword", "authenticationMethod">;
}
