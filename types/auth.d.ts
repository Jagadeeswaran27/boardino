export interface User {
  id?: string;
  email: string;
  hashedPassword?: string;
  name: string;
  image?: string;
  authenticationMethod: string;
}
