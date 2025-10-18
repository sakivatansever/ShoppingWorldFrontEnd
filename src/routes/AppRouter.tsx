import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Error from "../pages/Error";

// Components
import { LottieHandler, PageSuspenseFallback } from "../components/Feedback";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import ChangePassword from "../pages/ChangePasswordPage";
import CreateUser from "../pages/CreateUser";
import RequirePermission from "../components/Auth/RequirePermission";

// Sayfalar (Lazy Loading)
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const Products = lazy(() => import("../pages/Products"));
const Categories = lazy(() => import("../pages/Categories"));
const Coupons = lazy(() => import("../pages/Coupons"));
const Customers = lazy(() => import("../pages/Customers"));
const Couriers = lazy(() => import("../pages/Couriers"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div>
            <LottieHandler
              type="loading"
              message="Yükleniyor Lütfen Bekleyiniz..."
            />
          </div>
        }
      >
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <PageSuspenseFallback>
            <Dashboard />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "orders",
        element: (
          <PageSuspenseFallback>
            <Orders />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "products",
        element: (
          <PageSuspenseFallback>
            <Products />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "coupons",
        element: (
          <PageSuspenseFallback>
            <Coupons />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "customers",
        element: (
          <PageSuspenseFallback>
            <Customers />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "couriers",
        element: (
          <PageSuspenseFallback>
            <Couriers />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "createUser",
        element: (
          <RequirePermission controller="Auth" operation="Register">
            <PageSuspenseFallback>
              <CreateUser />
            </PageSuspenseFallback>
          </RequirePermission>
        ),
      },
      {
        path: "ChangePassword",
        element: (
          <PageSuspenseFallback>
            <ChangePassword />
          </PageSuspenseFallback>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense
        fallback={
          <div>
            <LottieHandler
              type="loading"
              message="Yükleniyor Lütfen Bekleyiniz..."
            />
          </div>
        }
      >
        <AuthLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;