import { Bot, SquareTerminal, Users, ShieldUser, Power } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../../../components/ui/sidebar";
import LogOut from "../logout/logout";
import Images from "../../../assets/images/images";
import NavMain from "./nav-main";
import "./main-sidebar.scss";

function MainSidebar({ ...props }) {
  const { t, i18n } = useTranslation("sidebar");
  const isRTL = i18n.language === "ar";
  const { state } = useSidebar();

  const data = {
    navMain: [
      {
        title: t("dashboard"),
        url: "/home",
        icon: SquareTerminal,
      },
      {
        title: t("products"),
        url: "/products",
        icon: Bot,
      },
      {
        title: t("users"),
        url: "#",
        icon: Users,
        items: [
          {
            title: t("admins"), 
            url: "#",
            icon: ShieldUser, 
          },
          {
            title: t("customers"),
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar
      id="sidebar_bx"
      collapsible="icon"
      {...props}
      className={`bg-[#3A1467] ${isRTL ? "right-0" : "left-0"}`}
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={
                state === "collapsed"
                  ? "py-2"
                  : "flex items-center space-x-1.5 px-2 py-4 rounded-lg hover:bg-transparent cursor-pointer"
              }
            >
              <div
                className={
                  state === "collapsed" ? "size-auto" : "size-8 hidden"
                }
              >
                <img
                  src={Images.logoWhite}
                  alt="logo"
                  className={state === "collapsed" ? "w-auto h-auto" : ""}
                />
                velora-admin
              </div>
              <div className="grid text-left text-sm leading-tight">
                <img
                  src={Images.logoWhite}
                  alt="logo"
                  className={
                    state === "collapsed" ? "hidden" : "w-[100px] h-auto"
                  }
                />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main navigation content */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <div className="py-3 px-1.5 rounded-md text-white flex justify-center bg-[#210049]">
          <LogOut
            logoutContent={{
              text: t("logout"),
              photo: <Power size={18} />,
              textStyle: `cursor-pointer flex gap-2 items-center ${
                state === "collapsed" ? "hidden" : "size-auto"
              }`,
            }}
          />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default MainSidebar;