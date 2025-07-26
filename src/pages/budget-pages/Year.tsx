import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export default function Year() {
  const [page, setPage] = useState(1)
  const currentYear = new Date().getFullYear()

  const yearPages: Record<number, number[]> = {
    1: Array.from({ length: 10 }, (_, i) => 2020 + i),
    2: Array.from({ length: 10 }, (_, i) => 2030 + i),
  }

  const years = yearPages[page]

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/BudgetSheets">Budget Sheets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="text-muted-foreground">
                Select a Year
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h2 className="text-xl font-semibold">Select a Year</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
{years.map((year) => {
  const isCurrent = year === currentYear
  return (
    <Link
      key={year}
      to={`/BudgetSheets/${year}`}
      className={clsx(
        "rounded-lg border p-4 text-center transition-colors",
        isCurrent
          ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm"
          : "border-border hover:bg-muted"
      )}
    >
      <div className="text-lg font-medium">{year}</div>
    </Link>
  )
})}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(2)}
            disabled={page === 2}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  )
}
