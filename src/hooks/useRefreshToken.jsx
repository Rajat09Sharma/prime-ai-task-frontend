import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { authAction } from "../store/authSlice";


export const useRefreshToken = () => {

    const dispatch = useDispatch();

    const fetchRefreshToken = async () => {

        try {
            const resposne = await axios.get("/auth/refresh", { withCredentials: true });
            console.log("fetching refresh token response:", resposne);
            dispatch(authAction.setAuthToken({ token: resposne.data.token, userId: resposne.data.userId }));
            return resposne.data.token;

        } catch (error) {
            console.log("fetching refresh token error", error);
        }

    }

    return (fetchRefreshToken)
}
