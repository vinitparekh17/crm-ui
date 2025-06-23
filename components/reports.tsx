"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Clock,
  Download,
  Share,
  Plus,
  Calendar,
  AlertTriangle,
  Users,
  BarChart3,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react"
import { CreateReportModal } from "@/components/modals/create-report-modal"
import { ScheduleReportModal } from "@/components/modals/schedule-report-modal"

export function Reports() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  const reportCategories = [
    {
      title: "Complaint Reports",
      description: "Track and analyze complaint data",
      icon: AlertTriangle,
      color: "red",
      reports: [
        { name: "Complaint Summary", description: "Overview of all complaints" },
        { name: "Resolution Time Analysis", description: "Average resolution times" },
        { name: "Complaint Trends", description: "Monthly and yearly trends" },
      ],
    },
    {
      title: "Customer Reports",
      description: "Customer analytics and insights",
      icon: Users,
      color: "blue",
      reports: [
        { name: "Customer Overview", description: "Complete customer statistics" },
        { name: "Satisfaction Scores", description: "Customer satisfaction metrics" },
        { name: "Retention Analysis", description: "Customer retention rates" },
      ],
    },
    {
      title: "Performance Reports",
      description: "Team and system performance",
      icon: BarChart3,
      color: "green",
      reports: [
        { name: "Team Performance", description: "Engineer productivity metrics" },
        { name: "Workload Distribution", description: "Task allocation analysis" },
        { name: "SLA Compliance", description: "Service level agreements" },
      ],
    },
  ]

  const recentReports = [
    {
      id: 1,
      name: "Monthly Complaint Summary",
      description: "December 2023 Report",
      type: "Complaint",
      format: "PDF",
      generated: "2 hours ago",
      status: "ready",
      icon: FileText,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: 2,
      name: "Customer Analytics Report",
      description: "Q4 2023 Analysis",
      type: "Customer",
      format: "Excel",
      generated: "1 day ago",
      status: "ready",
      icon: FileText,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      name: "Team Performance Report",
      description: "Weekly Performance Data",
      type: "Performance",
      format: "CSV",
      generated: "3 days ago",
      status: "processing",
      icon: FileText,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  const scheduledReports = [
    {
      id: 1,
      name: "Weekly Complaint Summary",
      schedule: "Every Monday at 9:00 AM",
      email: "admin@actosoft.com",
      format: "PDF",
      status: "active",
    },
    {
      id: 2,
      name: "Monthly Customer Report",
      schedule: "1st of every month at 8:00 AM",
      email: "team@actosoft.com",
      format: "Excel",
      status: "active",
    },
    {
      id: 3,
      name: "Quarterly Performance",
      schedule: "Every quarter at 10:00 AM",
      email: "management@actosoft.com",
      format: "PDF",
      status: "paused",
    },
  ]

  const generateReport = (reportName: string) => {
    console.log(`Generating report: ${reportName}`)
    // Implement report generation logic
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Reports</h2>
              <p className="text-gray-600">Generate comprehensive reports and analytics for business insights</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setShowScheduleModal(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Custom Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">47</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Reports</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="text-green-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <h3 className="text-gray-600 font-medium">Scheduled Reports</h3>
            <p className="text-sm text-blue-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Download className="text-orange-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">234</span>
            </div>
            <h3 className="text-gray-600 font-medium">Downloads</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Share className="text-purple-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">89</span>
            </div>
            <h3 className="text-gray-600 font-medium">Shared Reports</h3>
            <p className="text-sm text-purple-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +7% this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {reportCategories.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`text-${category.color}-600 h-6 w-6`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report) => (
                    <Button
                      key={report.name}
                      variant="ghost"
                      className="w-full justify-between h-auto p-3 text-left"
                      onClick={() => generateReport(report.name)}
                    >
                      <div>
                        <div className="font-medium text-gray-900">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Reports</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Generated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentReports.map((report) => {
                  const Icon = report.icon
                  return (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${report.bgColor} rounded-lg flex items-center justify-center`}>
                            <Icon className={`${report.iconColor} h-4 w-4`} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{report.name}</div>
                            <div className="text-sm text-gray-500">{report.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            report.type === "Complaint"
                              ? "border-red-200 text-red-800 bg-red-50"
                              : report.type === "Customer"
                                ? "border-blue-200 text-blue-800 bg-blue-50"
                                : "border-green-200 text-green-800 bg-green-50"
                          }
                        >
                          {report.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{report.generated}</div>
                        <div className="text-xs text-gray-500">Dec 15, 2023</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={
                            report.status === "ready"
                              ? "border-green-200 text-green-800 bg-green-50"
                              : "border-orange-200 text-orange-800 bg-orange-50"
                          }
                        >
                          {report.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Share">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Scheduled Reports</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowScheduleModal(true)}>
              <Plus className="mr-1 h-4 w-4" />
              Add Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledReports.map((schedule) => (
              <Card key={schedule.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{schedule.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share className="h-3 w-3" />
                      <span>{schedule.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      <span>{schedule.format} Format</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge
                      variant="outline"
                      className={
                        schedule.status === "active"
                          ? "border-green-200 text-green-800 bg-green-50"
                          : "border-yellow-200 text-yellow-800 bg-yellow-50"
                      }
                    >
                      {schedule.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateReportModal open={showCreateModal} onOpenChange={setShowCreateModal} />
      <ScheduleReportModal open={showScheduleModal} onOpenChange={setShowScheduleModal} />
    </div>
  )
}
