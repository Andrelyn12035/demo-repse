import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    name: string;
    role: string;
  }

  interface User {
    name: string;
    email: string;
    image: string;
  }
}