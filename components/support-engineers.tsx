"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, CheckCircle, Clock, UserPlus, TrendingUp, TrendingDown, Star, MoreVertical } from "lucide-react"
import { AddEngineerModal } from "@/components/modals/add-engineer-modal"
import { useEngineerStore } from "@/lib/stores/engineer-store"

export function SupportEngineers() {
  const [showAddModal, setShowAddModal] = useState(false)
  const { supportEngineers, getSupportStats } = useEngineerStore()
  const stats = getSupportStats()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Support Engineers</h2>
              <p className="text-gray-600">Monitor and manage support team performance and workload</p>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Engineer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.activeEngineers}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Engineers</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              All online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.activeTasks}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Tasks</h3>
            <p className="text-sm text-blue-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.resolvedToday}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Resolved Today</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="text-purple-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Avg Response Time</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.5h improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {supportEngineers.map((engineer) => (
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
                        className={`w-2 h-2 rounded-full ${
                          engineer.status === "online"
                            ? "bg-green-500"
                            : engineer.status === "away"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-xs font-medium ${
                          engineer.status === "online"
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
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{engineer.runningTasks}</div>
                  <div className="text-xs text-orange-700 font-medium uppercase tracking-wide">Running</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">{engineer.resolvedTasks}</div>
                  <div className="text-xs text-green-700 font-medium uppercase tracking-wide">Resolved</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Performance Score</span>
                  <span className="font-semibold text-gray-900">{engineer.performanceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${engineer.performanceScore}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Customer Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 h-3 w-3 fill-current" />
                    <span className="font-semibold text-gray-900">{engineer.customerRating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Support Activity</CardTitle>
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
                engineer: "Ravi",
                action: "resolved ticket #1234",
                description: "Customer login issue - 5 minutes ago",
                status: "resolved",
                icon: CheckCircle,
                iconColor: "text-green-600",
                bgColor: "bg-green-100",
              },
              {
                id: 2,
                engineer: "Vishal",
                action: "updated ticket #1235",
                description: "Added troubleshooting steps - 12 minutes ago",
                status: "in-progress",
                icon: Clock,
                iconColor: "text-blue-600",
                bgColor: "bg-blue-100",
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
                      activity.status === "resolved"
                        ? "border-green-200 text-green-800 bg-green-50"
                        : "border-blue-200 text-blue-800 bg-blue-50"
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
