import { getRequest, postRequest} from "@/utils/request"
export const authService = {
  login: (email: string, password: string) =>postRequest("/auth/login", { email, password }),
  logout: () => postRequest("/auth/logout", {}),
  getUser:()=>getRequest("/auth/user")
}
