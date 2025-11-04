import i18n from "i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Layouts
import AdminLayout from "./modules/layouts/admin-layout/admin-layout";
// Admin Pages
import DashboardPage from "./modules/admin/components/dashboard-page/dashboard-page";
import ProductsPage from "./modules/admin/components/products-page/products-page";
import AdminNotFound from "./modules/admin/components/admin-not-found/admin-not-found";

import { ThemeProvider } from "./utils/theme-provider";
//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // Language
  document.documentElement.lang = i18n.language;

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "home", element: <DashboardPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "*", element: <AdminNotFound /> },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={routes} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
