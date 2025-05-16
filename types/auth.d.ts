export interface User {
  id?: string;
  name: string;
  email: string;
  hashedPassword?: string;
  image?: string;
  authenticationMethod: authenticationMethod;
}

export type authenticationMethod = "github" | "google" | "credentials";
