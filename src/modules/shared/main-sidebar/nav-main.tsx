import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../../../components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
}

interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface NavMainProps {
  items: NavItem[];
}

function NavMain({ items }: NavMainProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { state } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <TooltipProvider delayDuration={100}>
          {items.map((item) => {
            const hasChildren = item.items && item.items.length > 0;
            const Icon = item.icon;

            if (hasChildren) {
              if (state === "collapsed") {
                return (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        tooltip={undefined}
                        className="text-white hover:bg-[#2e0067]! focus:bg-[#2e0067]! active:bg-[#2e0067]! hover:text-white"
                      >
                        {Icon && <Icon />}
                        <span className="text-base text-white">
                          {item.title}
                        </span>
                        <ChevronRight
                          className={
                            isRTL
                              ? "mr-auto rotate-180 transform transition-transform duration-200"
                              : "ml-auto transform transition-transform duration-200"
                          }
                        />
                      </SidebarMenuButton>
                    </TooltipTrigger>

                    <TooltipContent
                      side={isRTL ? "left" : "right"}
                      className="p-2 flex flex-col gap-1 shadow-lg rounded-lg w-40 bg-[#0a0a0a]"
                    >
                      {item.items?.map((sub) => (
                        <Link
                          key={sub.title}
                          to={sub.url}
                          className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-800 text-sm transition-colors"
                        >
                          {sub.icon && <sub.icon className="h-4 w-4" />}
                          <span>{sub.title}</span>
                        </Link>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="text-white hover:bg-[#2e0067]! focus:bg-[#2e0067]! active:bg-[#2e0067]! hover:text-white py-6"
                      >
                        {Icon && <Icon />}
                        <span className="text-base text-white">
                          {item.title}
                        </span>
                        <ChevronRight
                          className={
                            isRTL
                              ? "mr-auto rotate-180 transform transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                              : "ml-auto transform transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                          }
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="text-white hover:bg-[#2e0067]! focus:bg-[#2e0067]! active:bg-[#2e0067]! py-4"
                          >
                            <SidebarMenuSubButton
                              asChild
                              className="hover:bg-[#2e0067]! focus:bg-[#2e0067]! active:bg-[#2e0067]! py-4"
                            >
                              <Link to={subItem.url}>
                                <span className="text-[#e4cdff] py-6">
                                  {subItem.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            if (state === "collapsed") {
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={undefined}
                      className="text-white hover:bg-[#2e0067]! focus:bg-[#2e0067]! active:bg-[#2e0067]! py-4"
                    >
                      {Icon && <Icon />}
                      <span className="text-base">{item.title}</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>

                  <TooltipContent
                    side={isRTL ? "left" : "right"}
                    className="p-2 shadow-lg rounded-lg bg-[#0a0a0a]"
                  >
                    <Link
                      to={item.url || "#"}
                      className="block rounded-md px-2 py-1 hover:bg-gray-800 text-sm transition-colors text-white"
                    >
                      {item.title}
                    </Link>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="text-white hover:bg-[#2e0067]! focus:bg-[#2e0067]! active:bg-[#2e0067]! hover:text-white py-4"
                >
                  <Link
                    to={item.url || "#"}
                    className="flex items-center gap-2 w-full py-6"
                  >
                    {Icon && <Icon />}
                    <span className="text-base text-white">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </TooltipProvider>
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default NavMain;