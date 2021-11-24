import AuthContext from "./auth-context";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
