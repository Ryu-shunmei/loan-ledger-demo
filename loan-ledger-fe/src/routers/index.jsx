import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";

// elements
import {
    Home,
    Login,
    Users,
    Banks,
    Branchs,
} from "./elements"

// .
import pathConfig from "./pathConfig";

// ----------------------------------------------------------------------

export default function Router(){
    return useRoutes([
        {
            path: pathConfig.login,
            element: (
                <AuthLayout>
                    <Login />
                </AuthLayout>
            )
        },
        {
            path: pathConfig.homePage,
            element: (
                <MainLayout>
                    <Home />
                </MainLayout>
            )
        },
        {
            path: pathConfig.usersPage,
            element: (
                <MainLayout>
                    <Users />
                </MainLayout>
            )
        },
        {
            path: pathConfig.branchsPage,
            element: (
                <MainLayout>
                    <Branchs />
                </MainLayout>
            )
        },
        {
            path: pathConfig.banksPage,
            element: (
                <MainLayout>
                    <Banks />
                </MainLayout>
            )
        },
        {
            path: "*",
            element: <Navigate to="/404" replace />
        },
    ])
}