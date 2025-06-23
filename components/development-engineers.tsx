"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Code, CheckCircle, Clock, TrendingUp, Calendar,
  MoreVertical, GitBranch, Bug, ClipboardPlus, MessageCircle, Ban, Trash2, User
} from "lucide-react"
import { AddEngineerModal } from "@/components/modals/add-engineer-modal"
import { Engineer, useEngineerStore } from "@/lib/stores/engineer-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const viewProfile = (engineer: Engineer) => {
  console.log("View Profile:", engineer)
}

const assignTask = (engineer: Engineer) => {
  console.log("Assign Task to:", engineer)
}

const messageEngineer = (engineer: Engineer) => {
  console.log("Message Engineer:", engineer)
}

const markInactive = (engineer: Engineer) => {
  console.log("Mark as Inactive:", engineer)
}
const removeEngineer = (engineer: Engineer) => {
  console.log("Remove Engineer from Project:", engineer)
}



export function DevelopmentEngineers() {
  const [showAddModal, setShowAddModal] = useState(false)
  const { developmentEngineers, getDevelopmentStats } = useEngineerStore()
  const stats = getDevelopmentStats()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Development Engineers</h2>
              <p className="text-gray-600">Track development team progress and project assignments</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="bg-purple-600 hover:bg-purple-700">
              <Code className="mr-2 h-4 w-4" />
              Add Developer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Code className="text-purple-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.activeDevelopers}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Developers</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              All working
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="text-blue-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.activeProjects}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Projects</h3>
            <p className="text-sm text-blue-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.completedToday}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Completed Today</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.avgDevTime}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Avg Dev Time</h3>
            <p className="text-sm text-orange-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3h from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Developers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {developmentEngineers.map((engineer) => (
          <Card key={engineer.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className={`${engineer.avatarColor} text-white text-xl font-bold`}>
                      {engineer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{engineer.name}</h3>
                    <p className="text-sm text-gray-500">{engineer.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${engineer.status === "online"
                          ? "bg-green-500"
                          : engineer.status === "away"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          }`}
                      ></div>
                      <span
                        className={`text-xs font-medium ${engineer.status === "online"
                          ? "text-green-600"
                          : engineer.status === "away"
                            ? "text-yellow-600"
                            : "text-red-600"
                          }`}
                      >
                        {engineer.status}
                      </span>
                      <span className="text-xs text-gray-400">• {engineer.lastSeen}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => viewProfile(engineer)}>
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => assignTask(engineer)}>
                      <ClipboardPlus className="mr-2 h-4 w-4" />
                      Assign Task
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => messageEngineer(engineer)}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => markInactive(engineer)}>
                      <Ban className="mr-2 h-4 w-4" />
                      Mark as Inactive
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => removeEngineer(engineer)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove from Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{engineer.runningTasks}</div>
                  <div className="text-xs text-orange-700 font-medium uppercase tracking-wide">Running</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">{engineer.completedTasks}</div>
                  <div className="text-xs text-green-700 font-medium uppercase tracking-wide">Completed</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Code Quality Score</span>
                  <span className="font-semibold text-gray-900">{engineer.codeQuality}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${engineer.codeQuality}%` }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Sprint</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="text-blue-400 h-3 w-3" />
                    <span className="font-semibold text-gray-900">{engineer.currentSprint}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Specialization</span>
                  <Badge variant="outline" className={engineer.specializationColor}>
                    {engineer.specialization}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sprint Progress */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Current Sprint Progress</CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Sprint 12</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                5 days left
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">11</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">3</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">8</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>

          <Progress value={27} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>27% Complete</span>
            <span>Target: 80% by Friday</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Development Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Development Activity</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                engineer: "Mayur",
                action: "pushed new feature branch",
                description: "User authentication module - 8 minutes ago",
                status: "feature",
                icon: GitBranch,
                iconColor: "text-blue-600",
                bgColor: "bg-blue-100",
              },
              {
                id: 2,
                engineer: "Purva",
                action: "completed API integration",
                description: "Payment gateway integration - 25 minutes ago",
                status: "completed",
                icon: CheckCircle,
                iconColor: "text-green-600",
                bgColor: "bg-green-100",
              },
              {
                id: 3,
                engineer: "Priya",
                action: "updated design system",
                description: "Component library v2.1 - 1 hour ago",
                status: "design",
                icon: Bug,
                iconColor: "text-purple-600",
                bgColor: "bg-purple-100",
              },
            ].map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`${activity.iconColor} h-5 w-5`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {activity.engineer} {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      activity.status === "completed"
                        ? "border-green-200 text-green-800 bg-green-50"
                        : activity.status === "feature"
                          ? "border-blue-200 text-blue-800 bg-blue-50"
                          : "border-purple-200 text-purple-800 bg-purple-50"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <AddEngineerModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  )
}
