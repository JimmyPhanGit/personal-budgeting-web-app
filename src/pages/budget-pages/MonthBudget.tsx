import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Utensils,
  ShoppingCart,
  Tickets,
  Bus,
  Cat,
  Scissors,
  Gift,
  Volleyball,
  Home,
  CircleFadingPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import clsx from "clsx"
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts"
import { CustomDatePicker } from "@/components/datepicker.tsx"


const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const COLORS = [
  "#6366F1",
  "#10B981",
  "#EF4444",
  "#3B82F6",
  "#EC4899",
  "#22D3EE",
  "#A855F7",
  "#F97316",
  "#84CC16",
  "#14B8A6",
  "#EAB308",
  "#D946EF",
  "#6EE7B7",
]

type Item = {
  id: number
  description: string
  amount: number
}

type Transaction = {
  id: number
  category: string
  description: string
  date: string
  amount: number
}

function SummaryChart({
  transactions,
  incomeItems,
  fixedExpensesItems,
  investmentsItems,
}: {
  transactions: Transaction[]
  incomeItems: Item[]
  fixedExpensesItems: Item[]
  investmentsItems: Item[]
}) {
  const totalsByCategory = transactions.reduce<Record<string, number>>((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
    return acc
  }, {})

  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0)
  const totalFixed = fixedExpensesItems.reduce((sum, item) => sum + item.amount, 0)
  const totalInvestments = investmentsItems.reduce((sum, item) => sum + item.amount, 0)

  const discretionary = totalIncome - totalFixed - totalInvestments

  const data = Object.entries(totalsByCategory)
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="w-full max-w-sm">
      <div className="text-xl font-semibold mb-4 text-center">
        Spending Breakdown for ${discretionary.toFixed(2)}
      </div>
      <ResponsiveContainer width="100%" height={375}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ value }) => `$${value.toFixed(2)}`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
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
    <Card className={clsx("w-full md:w-[80%]", bgColor)}>
      <CardContent className="p-4">
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
      </CardContent>
    </Card>
  )
}

function AddTransactionDialog({ onAdd }: { onAdd: (transaction: Transaction) => void }) {
  const [open, setOpen] = useState(false)

  // Selected category key or "other"
  const [category, setCategory] = useState("")
  // Custom category if "other" is chosen
  const [customCategory, setCustomCategory] = useState("")

  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [amount, setAmount] = useState("")

  // The categories and icons
  const categories = [
    { key: "Food", label: "Food", Icon: Utensils },
    { key: "Shopping", label: "Shopping", Icon: ShoppingCart },
    { key: "Entertainment", label: "Entertainment", Icon: Tickets },
    { key: "Transportation", label: "Transportation", Icon: Bus },
    { key: "Pet", label: "Pet", Icon: Cat },
    { key: "Cosmetic", label: "Cosmetic", Icon: Scissors },
    { key: "Gift", label: "Gift", Icon: Gift },
    { key: "Sport", label: "Sport", Icon: Volleyball },
    { key: "Home", label: "Home", Icon: Home },
    { key: "Other", label: "Other", Icon: CircleFadingPlus },
  ]


  const handleSubmit = () => {
    const amountNum = parseFloat(amount)
    let finalCategory = category === "other" ? customCategory.trim() : category

    if (!finalCategory || !description || !date || isNaN(amountNum)) {
      alert("Please fill out all fields correctly.")
      return
    }

    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    onAdd({
      category: finalCategory,
      description,
      date: formattedDate,
      amount: amountNum,
      id: Date.now(),
    })

    // Reset form
    setCategory("")
    setCustomCategory("")
    setDescription("")
    setDate(undefined)
    setAmount("")
    setOpen(false)
  }


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mb-4">Add Transaction</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the fields below to add a new transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-5 gap-3 mt-4">
          {categories.map(({ key, label, Icon }) => {
            const selected = category === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={clsx(
                  "flex flex-col items-center p-2 rounded border cursor-pointer select-none",
                  selected
                    ? "border-blue-600 bg-blue-100 text-blue-700"
                    : "border-gray-300 hover:bg-gray-100"
                )}
              >
                <Icon className="mb-1 h-6 w-6" />
                <span className="text-xs">{label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {/* Row 1: Description full width */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />

          {/* Row 2: Datepicker and Amount side by side */}
          <div className="flex gap-4">
            <CustomDatePicker date={date} setDate={setDate} />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Add</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [...prev, { ...tx, id: Date.now() }])
    // Optionally, also add to one of incomeItems, fixedExpensesItems, or investmentsItems based on tx.category
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

      <main className="flex flex-col md:flex-row gap-10 p-4">
        <div className="flex flex-col gap-10 md:w-1/2 w-full">
          <CollapsibleSection
            title="Income"
            items={incomeItems}
            addItem={(desc, amt) =>
              setIncomeItems((items) => [...items, { id: Date.now(), description: desc, amount: amt }])
            }
            bgColor="bg-green-50"
            open={openSection === "income"}
            onToggle={() => toggleSection("income")}
          />
          <CollapsibleSection
            title="Fixed Expenses"
            items={fixedExpensesItems}
            addItem={(desc, amt) =>
              setFixedExpensesItems((items) => [...items, { id: Date.now(), description: desc, amount: amt }])
            }
            bgColor="bg-red-50"
            open={openSection === "fixed"}
            onToggle={() => toggleSection("fixed")}
          />
          <CollapsibleSection
            title="Investments / Savings"
            items={investmentsItems}
            addItem={(desc, amt) =>
              setInvestmentsItems((items) => [...items, { id: Date.now(), description: desc, amount: amt }])
            }
            bgColor="bg-blue-50"
            open={openSection === "investments"}
            onToggle={() => toggleSection("investments")}
          />
        </div>

        <div className="md:w-1/2 w-full flex justify-center items-start">
          <SummaryChart
            transactions={transactions}
            incomeItems={incomeItems}
            fixedExpensesItems={fixedExpensesItems}
            investmentsItems={investmentsItems}
          />
        </div>
      </main>

      <div className="w-[80%] px-md:px-8 mt-10 mx-auto">
        <div className="text-xl font-semibold mb-4">All Transactions</div>
        <AddTransactionDialog onAdd={handleAddTransaction} />
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 px-4 py-2 text-left">Category</TableHead>
              <TableHead className="w-1/2 px-4 py-2 text-left">Date</TableHead>
              <TableHead className="w-1/2 px-4 py-2 text-left">Description</TableHead>
              <TableHead className="w-1/3 px-4 py-2 text-right">Amount ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-2 text-left">{item.category}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.date}</TableCell>
                <TableCell className="px-4 py-2 text-left">{item.description}</TableCell>
                <TableCell className="px-4 py-2 text-right">{item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-medium text-right">
                Total: <span className="ml-2 font-semibold">${transactions.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</span>
              </TableCell>

            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}
