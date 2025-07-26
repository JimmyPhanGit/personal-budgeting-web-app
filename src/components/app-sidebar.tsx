import * as React from "react"
import {
  BookCheck,
  Home,
  Map,
  PiggyBank,
  Settings,
  ChartCandlestick
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Jimmy Phan",
    email: "jimmyphan1@hotmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navOverview: {
    label: "",
    items: [
      {
        title: "Overview",
        url: "Overview",
        icon: Home,
      }
    ],
  },
  navMain: {
    label: "Budgeting",
    items: [
      {
        title: "Budget Sheets",
        url: "BudgetSheets",
        icon: BookCheck,
      },
      {
        title: "Goals",
        url: "Goals",
        icon: Map,
      },
    ],
  },
    navSettings: {
    label: "Additional Resources",
    items: [
      {
        title: "Settings",
        url: "Settings",
        icon: Settings,
      },
      {
        title: "Currency Converter",
        url: "Convert",
        icon: ChartCandlestick,
      },
    ],
    
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <PiggyBank className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg ml-2">Personal Budgeting</span>
            </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label={data.navOverview.label} items={data.navOverview.items} />
        <NavMain label={data.navMain.label} items={data.navMain.items} />
        <NavMain label={data.navSettings.label} items={data.navSettings.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
