
import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Modal } from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useEffect } from 'react'
import axios from '../api/axios'
import { authAction } from '../store/authSlice'
import { userLogout } from '../store/customActions'

export const RootLayout = () => {

    const authToken = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRefreshToken = async () => {
            try {
                const response = await axios.get("/auth/refresh", { withCredentials: true });
                // console.log("home refresh token", response.data);
                dispatch(authAction.setAuthToken({ token: response.data.token, userId: response.data.userId }))

            } catch (error) {
                console.log("Home refresh token error", error);
                await dispatch(userLogout());
                navigate("/auth/login");
            }
        }
        if (!authToken) {
            fetchRefreshToken();
        }
    }, [authToken])

    if (!authToken) {
        return <LoadingSpinner />
    }

    return (
        <>
            <Navbar />
            <main className='h-screen'>
                <Outlet />
                <Modal />
            </main>
            <Footer />
        </>
    )
}
