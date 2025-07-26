import { Link, useParams } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import clsx from "clsx"

const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
]

export default function Month() {
  const { year } = useParams<{ year: string }>()
  const currentMonth = new Date().getMonth() + 1 
  const currentYear = new Date().getFullYear()

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/BudgetSheets">Budget Sheets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={`/BudgetSheets/${year}`}>{year}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="text-muted-foreground">Select a Month</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h2 className="text-xl font-semibold">Select a Month</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {months.map(({ name, number }) => {
            const isCurrent = currentYear === Number(year) && number === currentMonth
            return (
              <Link
                key={number}
                to={`/BudgetSheets/${year}/${number}`}
                className={clsx(
                  "rounded-lg border p-4 text-center transition-colors",
                  isCurrent
                    ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm"
                    : "border-border hover:bg-muted"
                )}
              >
                <div className="text-lg font-medium">{name}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
