"use client"

import { type LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  label,
  items,
}: {
  label: string
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const location = useLocation()

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = location.pathname.startsWith(`/${item.url}`)

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={[
                  "transition-colors",
                  isActive
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800",
                ].join(" ")}
              >
                <Link
                  to={`/${item.url}`}
                  className="flex items-center gap-2 w-full"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
