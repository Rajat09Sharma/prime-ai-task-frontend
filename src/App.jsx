import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./Pages/RootLayout"
import { AuthLayout } from "./Pages/authLayout"
import { LoginPage } from "./Pages/LoginPage"
import { SignupPage } from "./Pages/SignupPage"
import { HomePage } from "./Pages/HomePage"
import { NotePage } from "./Pages/NotePage"
import { CreateNotePage } from "./Pages/CreateNotePage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/note/:id", element: <NotePage /> },
      { path: "/create/note", element: <CreateNotePage /> }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />
      },
      {
        path: "/auth/signup",
        element: <SignupPage />
      }
    ]
  }
])


function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
