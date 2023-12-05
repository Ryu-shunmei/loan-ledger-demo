import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";

// ----------------------------------------------------------------------
const Login = lazy(() => import("@/pages/login-page"));

const Cases = lazy(() => import("@/pages/cases-page"));

const Banks = lazy(()=>import("@/pages/banks-page"))

const Branchs = lazy(()=>import("@/pages/branchs-page"))

const Users = lazy(()=>import("@/pages/users-page"))
// ----------------------------------------------------------------------
export default function Router() {
  return useRoutes([
    {
      path: "/login",
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: "/cases",
      element: (
        <MainLayout>
          <Cases />
        </MainLayout>
      ),
    },
    {
      path: "/banks",
      element: (
        <MainLayout>
          <Banks />
        </MainLayout>
      ),
    },
    {
      path: "/branchs",
      element: (
        <MainLayout>
          <Branchs />
        </MainLayout>
      ),
    },
    {
      path: "/users",
      element: (
        <MainLayout>
          <Users />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
