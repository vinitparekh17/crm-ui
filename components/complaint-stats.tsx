"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  UserPlus,
  Headphones,
  Code,
  Play,
  Pause,
  CheckCircle,
  Hand,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
} from "lucide-react"
import { useComplaintStore } from "@/lib/stores/complaint-store"

export function ComplaintStats() {
  const { complaints, getComplaintStats } = useComplaintStore()
  const stats = getComplaintStats()

  const statusCards = [
    {
      key: "pending",
      label: "Pending",
      count: stats.pending,
      icon: Clock,
      color: "orange",
      change: "-2 from yesterday",
      trend: "down",
    },
    {
      key: "new-client",
      label: "New Client Pending",
      count: 0,
      icon: UserPlus,
      color: "blue",
      change: "No change",
      trend: "neutral",
    },
    {
      key: "support",
      label: "In Support",
      count: stats.inSupport,
      icon: Headphones,
      color: "green",
      change: "+3 from yesterday",
      trend: "up",
    },
    {
      key: "development",
      label: "In Development",
      count: stats.inDevelopment,
      icon: Code,
      color: "purple",
      change: "+5 from yesterday",
      trend: "up",
    },
    {
      key: "running",
      label: "Develop Running",
      count: stats.developRunning,
      icon: Play,
      color: "indigo",
      change: "+2 from yesterday",
      trend: "up",
    },
    {
      key: "dev-pending",
      label: "Develop Pending",
      count: stats.developPending,
      icon: Pause,
      color: "yellow",
      change: "-1 from yesterday",
      trend: "down",
    },
    {
      key: "resolved",
      label: "Resolved",
      count: stats.resolved,
      icon: CheckCircle,
      color: "green",
      change: "+4 from yesterday",
      trend: "up",
    },
    {
      key: "hold",
      label: "On Hold",
      count: stats.onHold,
      icon: Hand,
      color: "red",
      change: "No change",
      trend: "neutral",
    },
  ]

  const recentComplaints = complaints.slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complaint Stats</h2>
          <p className="text-gray-600">Detailed analytics and statistics for all complaint activities</p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <span className="hidden bg-yellow-100 bg-indigo-100"></span>
        {statusCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.key} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${card.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`text-${card.color}-600 h-6 w-6`} />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{card.count}</span>
                </div>
                <h3 className="text-gray-600 font-medium mb-2">{card.label}</h3>
                <div className="flex items-center text-sm">
                  <span
                    className={`
                    ${card.trend === "up" ? "text-green-600" : card.trend === "down" ? "text-red-600" : "text-gray-500"}
                  `}
                  >
                    {card.trend === "up" && <TrendingUp className="h-3 w-3 mr-1 inline" />}
                    {card.trend === "down" && <TrendingDown className="h-3 w-3 mr-1 inline" />}
                    {card.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Priority Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Critical", count: 8, percentage: 10.8, color: "red" },
                { label: "High", count: 15, percentage: 20.3, color: "orange" },
                { label: "Medium", count: 32, percentage: 43.2, color: "yellow" },
                { label: "Low", count: 19, percentage: 25.7, color: "green" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-900">{item.count}</span>
                    <span className="text-sm text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2.4h</div>
                <div className="text-sm text-gray-500">Overall Average</div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Critical", time: "45m", color: "red" },
                  { label: "High", time: "1.2h", color: "orange" },
                  { label: "Medium", time: "3.1h", color: "yellow" },
                  { label: "Low", time: "6.8h", color: "green" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.label}</span>
                    <span className={`font-semibold text-${item.color}-600`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">78.3%</div>
                <div className="text-sm text-gray-500">This Month</div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Today", rate: "85.2%", color: "green" },
                  { label: "This Week", rate: "81.7%", color: "green" },
                  { label: "Last Month", rate: "74.9%", color: "blue" },
                  { label: "Target", rate: "80.0%", color: "gray" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.label}</span>
                    <span className={`font-semibold text-${item.color}-600`}>{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Complaint Activity</CardTitle>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Issue Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 text-sm font-medium text-blue-600">#{complaint.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{complaint.customerName}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{complaint.issueType}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          complaint.priority === "critical"
                            ? "border-red-200 text-red-800 bg-red-50"
                            : complaint.priority === "high"
                              ? "border-orange-200 text-orange-800 bg-orange-50"
                              : complaint.priority === "medium"
                                ? "border-yellow-200 text-yellow-800 bg-yellow-50"
                                : "border-green-200 text-green-800 bg-green-50"
                        }
                      >
                        {complaint.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          complaint.status === "resolved"
                            ? "border-green-200 text-green-800 bg-green-50"
                            : complaint.status === "in-progress"
                              ? "border-blue-200 text-blue-800 bg-blue-50"
                              : "border-orange-200 text-orange-800 bg-orange-50"
                        }
                      >
                        {complaint.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{complaint.assignedTo}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
