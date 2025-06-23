"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import { AddComplaintModal } from "@/components/modals/add-complaint-modal"
import { useComplaintStore } from "@/lib/stores/complaint-store"

export function ComplaintMaster() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { complaints, deleteComplaint } = useComplaintStore()

  // Filter complaints based on search and filters
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toString().includes(searchTerm)

    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedComplaints = filteredComplaints.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this complaint?")) {
      deleteComplaint(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "border-green-200 text-green-800 bg-green-50"
      case "in-progress":
        return "border-blue-200 text-blue-800 bg-blue-50"
      case "pending":
        return "border-orange-200 text-orange-800 bg-orange-50"
      case "on-hold":
        return "border-gray-200 text-gray-800 bg-gray-50"
      default:
        return "border-gray-200 text-gray-800 bg-gray-50"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-red-200 text-red-800 bg-red-50"
      case "high":
        return "border-orange-200 text-orange-800 bg-orange-50"
      case "medium":
        return "border-yellow-200 text-yellow-800 bg-yellow-50"
      case "low":
        return "border-green-200 text-green-800 bg-green-50"
      default:
        return "border-gray-200 text-gray-800 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complaint Master</h2>
              <p className="text-gray-600">Manage and track all complaint records with comprehensive details</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Complaint
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search complaints by ID, customer, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span>ID</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>Customer</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>Issue Type</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>Priority</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>Status</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>Assigned To</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>Created</span>
                      <ArrowUpDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="font-medium text-blue-600">#{complaint.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {complaint.customerName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{complaint.customerName}</div>
                          <div className="text-sm text-gray-500">{complaint.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        {complaint.issueType}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="outline" className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                            {complaint.assignedTo.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">{complaint.assignedTo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{new Date(complaint.createdAt).toLocaleTimeString()}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(complaint.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredComplaints.length)}</span> of{" "}
                <span className="font-medium">{filteredComplaints.length}</span> results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddComplaintModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  )
}
