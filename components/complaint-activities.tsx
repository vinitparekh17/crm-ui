"use client"

import { useComplaintStore } from "@/lib/stores/complaint-store"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useMemo } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ComplaintActivities() {
  const { complaints } = useComplaintStore()
  const router = useRouter()

  const sortedComplaints = useMemo(
    () => [...complaints].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [complaints]
  )

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2 text-gray-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">All Complaint Activities</CardTitle>
            <Input type="text" placeholder="Search complaints..." className="w-full md:w-1/3" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {sortedComplaints.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No complaint activities found.</p>
            ) : (
              sortedComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600 h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      Complaint #{complaint.id} {complaint.status === "resolved" ? "resolved" : "updated"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {complaint.issueType} - {complaint.description.slice(0, 80)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(complaint.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Badge
                    variant={complaint.status === "resolved" ? "default" : "secondary"}
                    className={
                      complaint.status === "resolved"
                        ? "bg-green-100 text-green-800"
                        : complaint.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                    }
                  >
                    {complaint.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
