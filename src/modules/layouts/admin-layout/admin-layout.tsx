import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminPageTitle from "../../../utils/page-titles/admin-page-title";
import MainLoader from "../../shared/loaders/main-loader";
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import { Separator } from "../../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import MainSidebar from "../../shared/main-sidebar/main-sidebar";
import LanguageSwitch from "../../shared/language-switch/language-switch";
import { ThemeToggle } from "../../shared/theme-toggle/theme-toggle";
import "./admin-layout.scss";

const AdminLayout = () => {
  // Admin page titles
  AdminPageTitle();

  const dispatch = useDispatch();

  // fire loader
  const fireLoader = () => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 800);
  };

  useEffect(() => {
    fireLoader();
  }, []);

  return (
    <div id="admin-layout" className="bg-white min-h-dvh">
      {/* Loader */}
      <MainLoader />

      <SidebarProvider>
        <MainSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="px-4 flex gap-3">
                {/* language switcher */}
                <LanguageSwitch />

                {/* Theme toggle */}
                <ThemeToggle />
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Pages */}
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
