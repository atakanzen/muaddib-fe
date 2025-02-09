import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ReactMarkdown, { Components } from "react-markdown";

import documentation from "/assets/docs/documentation.md?raw";

const Documentation = () => {
  const components: Components = {
    h2: ({ node, ...props }) => {
      return <h2 className={`scroll-mt-24`} {...props} />;
    },
    h3: ({ node, className, ...props }) => {
      return <h3 className={`scroll-mt-24`} {...props} />;
    },
  };
  return (
    <>
      <SidebarProvider className="">
        <AppSidebar />
        <SidebarInset className="pt-[80px]">
          <header className="fixed w-full bg-inherit flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Getting Started</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Introduction</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-col items-center gap-4 pt-20 pb-6">
            <article className="prose lg:prose-lg  lg:max-w-4xl ">
              <ReactMarkdown components={components} children={documentation} />
            </article>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Documentation;
