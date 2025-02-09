import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useState } from "react";

interface SidebarLink {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  items?: SidebarLink[];
}

interface SidebarData {
  navMain: SidebarLink[];
}

// This is sample data.
const data: SidebarData = {
  navMain: [
    {
      id: "1",
      title: "Getting Started",
      url: "#getting-started",
      items: [
        {
          id: "1.2",
          title: "Introduction",
          url: "#introduction",
          isActive: false,
        },
      ],
      isActive: false,
    },
    {
      id: "2",
      title: "Decision Trees",
      url: "#decision-trees",
      items: [
        {
          id: "2.1",
          title: "Creating Decision Trees",
          url: "#creating-decision-trees",
          isActive: false,
        },
        {
          id: "2.2",
          title: "Deleting Decision Trees",
          url: "#deleting-decision-trees",
          isActive: false,
        },
        {
          id: "2.3",
          title: "Editing Decision Trees",
          url: "#editing-decision-trees",
          isActive: false,
        },
      ],
      isActive: false,
    },
    {
      id: "3",
      title: "Decision Tree Editor",
      url: "#decision-tree-editor",
      items: [
        {
          id: "3.1",
          title: "Adding Nodes",
          url: "#adding-nodes",
          isActive: false,
        },
        {
          id: "3.2",
          title: "Managing Nodes",
          url: "#managing-nodes",
          isActive: false,
        },
      ],
      isActive: false,
    },
    {
      id: "4",
      title: "Further Questions",
      url: "#further-questions",
      items: [
        {
          id: "4.1",
          title: "Contact Us",
          url: "#contact-us",
          isActive: false,
        },
      ],
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navData, setNavData] = useState<SidebarData>(data);

  const handleOnClickLink = (
    itemURL: string,
    itemID: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const clickedAnchor = document.querySelector(
      `h2 > a[href='${itemURL}'], h3 > a[href='${itemURL}']`
    );
    if (clickedAnchor) {
      clickedAnchor.scrollIntoView({ block: "center", behavior: "smooth" });
    }

    window.history.pushState(null, "", itemURL);

    setNavData((prevData) => ({
      navMain: prevData.navMain.map((item) => ({
        ...item,
        isActive: item.id === itemID,
        items: item.items?.map((subItem) => ({
          ...subItem,
          isActive: subItem.id === itemID,
        })),
      })),
    }));
  };

  return (
    <Sidebar {...props} className="mt-20">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navData.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <a
                    onClick={(e) => handleOnClickLink(item.url, item.id, e)}
                    href={item.url}
                    className="font-medium"
                  >
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a
                            onClick={(e) =>
                              handleOnClickLink(item.url, item.id, e)
                            }
                            href={item.url}
                          >
                            {item.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
