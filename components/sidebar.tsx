"use client";

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Code,
  FileText,
  Headphones,
  Menu,
  Settings,
  Users,
  X,
  Bell,
  LogOut,
  User,
  ChevronDown,
  Zap,
} from "lucide-react"
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
  { label: "Complaint Stats", icon: BarChart3, href: "/complaint-stats" },
  { label: "Support Engineers", icon: Headphones, href: "/support-engineers" },
  { label: "Development Engineers", icon: Code, href: "/development-engineers" },
  { label: "Complaint Master", icon: FileText, href: "/complaint-master" },
  { label: "Customer Management", icon: Users, href: "/customer-management" },
  { label: "Reports", icon: FileText, href: "/reports" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()
  if (pathName != "/")
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed top-4 left-4 z-50 bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        {/* Sidebar */}
        <div
          className={`
        fixed lg:relative w-80 h-screen bg-white border-r border-gray-300 flex flex-col z-40 
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
        >
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">ACTOSOFT</h1>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 py-6 px-4 overflow-y-auto">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathName === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    passHref
                    legacyBehavior
                  >
                    <Button

                      variant="ghost"
                      className={`
                      w-full justify-start gap-3 h-12 px-4
                      ${isActive
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                        }
                    `}
                      onClick={() => {
                        setIsOpen(false)
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      V
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">Vinit</p>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
        )}
      </>
    )
}
