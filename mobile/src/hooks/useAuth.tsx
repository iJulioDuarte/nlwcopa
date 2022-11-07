import { useContext} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextDataProps } from "../contexts/types/AuthContextTypes";

export const useAuth = (): AuthContextDataProps => {
    const context = useContext(AuthContext);

    return context;
}