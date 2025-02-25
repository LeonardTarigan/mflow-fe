import { useCookies } from "next-client-cookies";
import { IEmployee } from "../models/employee.model";

export default function useCookiesData() {
  const cookies = useCookies();

  const user: IEmployee = JSON.parse(cookies.get("user") || "{}");

  return user;
}
