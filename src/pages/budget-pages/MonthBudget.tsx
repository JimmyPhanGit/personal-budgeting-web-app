import { useState } from "react"
import { useParams } from "react-router-dom"
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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

type Item = {
  id: number
  description: string
  amount: number
}

function CollapsibleSection({
  title,
  items,
  addItem,
  bgColor,
  open,
  onToggle,
}: {
  title: string
  items: Item[]
  addItem: (desc: string, amount: number) => void
  bgColor: string
  open: boolean
  onToggle: () => void
}) {
  const [desc, setDesc] = useState("")
  const [amount, setAmount] = useState("")

  const handleAdd = () => {
    const amountNum = parseFloat(amount)
    if (!desc || isNaN(amountNum)) return
    addItem(desc, amountNum)
    setDesc("")
    setAmount("")
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className={clsx("border rounded-lg p-4 w-full md:w-[32%]", bgColor)}>
      <button
        className="w-full flex justify-between items-center text-left font-semibold text-lg"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span>{`${title}: $${total.toFixed(2)}`}</span>
        <svg
          className={clsx("w-5 h-5 transition-transform duration-200 cursor-pointer", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden",
          open ? "max-h-[500px] mt-4" : "max-h-0"
        )}
      >
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border rounded px-2 py-1 w-3/4"
            />
            <input
              type="number"
              placeholder="$"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded px-2 py-1 w-1/4"
            />
            <button onClick={handleAdd} className="bg-black text-white px-3 py-1 rounded">
              Add
            </button>
          </div>
          <ul className="text-sm list-disc list-inside">
            {items.map((item) => (
              <li key={item.id}>
                {item.description}: ${item.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function MonthBudget() {
  const { year, month } = useParams<{ year: string; month: string }>()
  const monthIndex = Number(month) - 1
  const monthName = months[monthIndex] || ""

  const [incomeItems, setIncomeItems] = useState<Item[]>([])
  const [fixedExpensesItems, setFixedExpensesItems] = useState<Item[]>([])
  const [investmentsItems, setInvestmentsItems] = useState<Item[]>([])

  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

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
              <BreadcrumbItem className="text-muted-foreground">{monthName}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

<main className="flex flex-col gap-4 p-4 md:flex-row md:items-start">
        <CollapsibleSection
          title="Income"
          items={incomeItems}
          addItem={(desc, amt) => setIncomeItems((items) => [...items, { id: Date.now(), description: desc, amount: amt }])}
          bgColor="bg-green-50"
          open={openSection === "income"}
          onToggle={() => toggleSection("income")}
        />
        <CollapsibleSection
          title="Fixed Expenses"
          items={fixedExpensesItems}
          addItem={(desc, amt) => setFixedExpensesItems((items) => [...items, { id: Date.now(), description: desc, amount: amt }])}
          bgColor="bg-red-50"
          open={openSection === "fixed"}
          onToggle={() => toggleSection("fixed")}
        />
        <CollapsibleSection
          title="Investments / Savings"
          items={investmentsItems}
          addItem={(desc, amt) => setInvestmentsItems((items) => [...items, { id: Date.now(), description: desc, amount: amt }])}
          bgColor="bg-blue-50"
          open={openSection === "investments"}
          onToggle={() => toggleSection("investments")}
        />
      </main>
    </>
  )
}
