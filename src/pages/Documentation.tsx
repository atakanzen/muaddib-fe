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

const Documentation = () => {
  return (
    <div className="flex items-center justify-center">
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset className="pt-20">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
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
          <div className="flex flex-1 flex-col gap-4 p-4">
            <p className="md:prose-lg lg:prose-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              nostrum laborum inventore sunt, omnis asperiores minus quibusdam.
              Perferendis, possimus consectetur. Facere, asperiores
              exercitationem. Asperiores iure ad molestiae enim modi vero
              perferendis nemo eligendi, nihil nostrum voluptate quasi amet
              possimus quaerat ducimus tempora, provident earum atque odit? Nam
              aliquid dicta temporibus tenetur numquam ullam quam eligendi hic
              vitae perferendis voluptas, magnam, sapiente corporis pariatur
              necessitatibus itaque id fugiat maiores. Corrupti facere soluta
              dolorem nisi ipsum blanditiis necessitatibus dolore adipisci
              pariatur optio magnam voluptatum ipsa repellat ex sed eos natus
              suscipit dolores velit excepturi, quos reprehenderit dignissimos
              quibusdam non! Iure voluptatem neque consequuntur assumenda, natus
              delectus eos, ab illo expedita quibusdam veritatis vero aliquam
              eius! Non incidunt, quos odio vel maxime ea. Praesentium enim illo
              ullam molestias odio alias, commodi corrupti ea numquam, placeat
              earum vitae? Porro, repudiandae iure. Nesciunt magni, vitae saepe
              doloremque consequuntur qui neque tenetur optio aut dolorum,
              incidunt blanditiis, culpa iusto quos minima minus. Magni
              consequuntur, obcaecati amet laboriosam incidunt eum ipsum,
              asperiores laborum fugit consequatur accusamus doloremque saepe ad
              quia fugiat, suscipit deserunt esse delectus qui rem adipisci ab
              praesentium! Eius eligendi assumenda saepe provident sint sit
              totam asperiores, veritatis sunt aspernatur culpa beatae commodi.
              Natus, facere? Aspernatur laboriosam quasi reprehenderit
              accusantium laborum aut voluptas quibusdam illo nam voluptate
              necessitatibus fuga eius totam quidem cupiditate doloremque
              sapiente, labore odit dolore ullam. Libero impedit odio totam
              tenetur provident quisquam iste. A quidem, pariatur culpa atque
              velit nesciunt distinctio!
            </p>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Documentation;
