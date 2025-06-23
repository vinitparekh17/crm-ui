"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, CheckCircle, Users, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { RegisterComplaintModal } from "@/components/modals/register-complaint-modal"
import { useComplaintStore } from "@/lib/stores/complaint-store"
import { useEngineerStore } from "@/lib/stores/engineer-store"
import Link from "next/link"

export function Dashboard() {
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const { complaints, getComplaintStats } = useComplaintStore()
  const { getActiveEngineers } = useEngineerStore()

  const stats = getComplaintStats()
  const activeEngineers = getActiveEngineers()

  const recentActivity = complaints.slice(0, 3).map((complaint) => ({
    id: complaint.id,
    title: `Complaint #${complaint.id} ${complaint.status === "resolved" ? "resolved" : "updated"}`,
    description: `${complaint.issueType} - ${complaint.description.slice(0, 50)}...`,
    time: new Date(complaint.createdAt).toLocaleString(),
    status: complaint.status,
    assignedTo: complaint.assignedTo,
  }))

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaint Live Dashboard</h1>
          <p className="text-gray-600">Monitor and manage all complaint activities in real-time</p>
        </div>
        <Button onClick={() => setShowRegisterModal(true)} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4" />
          Register Complaint
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-blue-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Complaints</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.pending}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Pending</h3>
            <p className="text-sm text-red-600 mt-1 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.resolved}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Resolved</h3>
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{activeEngineers.length}</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Engineers</h3>
            <p className="text-sm text-gray-500 mt-1">Currently working</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link
              href={'/complaint-activities'}
              passHref
              legacyBehavior
            >
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <Badge
                  variant={activity.status === "resolved" ? "default" : "secondary"}
                  className={
                    activity.status === "resolved"
                      ? "bg-green-100 text-green-800"
                      : activity.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RegisterComplaintModal open={showRegisterModal} onOpenChange={setShowRegisterModal} />
    </div>
  )
}


