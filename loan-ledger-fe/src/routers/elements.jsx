import { lazy } from "react";

// ----------------------------------------------------------------------

export const Home = lazy(() => import("@/pages/home-page"))
export const Users = lazy(() => import("@/pages/users-page"))
export const Branchs = lazy(() => import("@/pages/branch-page"))
export const Banks = lazy(() => import("@/pages/bank-page"))


export const Login = lazy(() => import("@/pages/auth-pages/login"))