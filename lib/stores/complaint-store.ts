import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Complaint {
  id: string
  customerName: string
  customerEmail: string
  issueType: string
  priority: "low" | "medium" | "high" | "critical"
  status: "pending" | "in-progress" | "resolved" | "on-hold"
  assignedTo: string
  description: string
  createdAt: string
  updatedAt: string
}

interface ComplaintStore {
  complaints: Complaint[]
  addComplaint: (complaint: Omit<Complaint, "id" | "createdAt" | "updatedAt">) => void
  updateComplaint: (id: string, updates: Partial<Complaint>) => void
  deleteComplaint: (id: string) => void
  getComplaintStats: () => {
    total: number
    pending: number
    inProgress: number
    resolved: number
    onHold: number
    inSupport: number
    inDevelopment: number
    developRunning: number
    developPending: number
  }
  getComplaintsByStatus: (status: string) => Complaint[]
}

// Sample data
const sampleComplaints: Complaint[] = [
  {
    id: "1234",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    issueType: "Login Issue",
    priority: "critical",
    status: "resolved",
    assignedTo: "Ravi",
    description: "Customer unable to login to their account",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "1235",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    issueType: "Feature Request",
    priority: "high",
    status: "in-progress",
    assignedTo: "Mayur",
    description: "Request for new dashboard features",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "1236",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    issueType: "Bug Report",
    priority: "medium",
    status: "pending",
    assignedTo: "Vishal",
    description: "UI rendering issue on mobile devices",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "1237",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    issueType: "Support Request",
    priority: "low",
    status: "on-hold",
    assignedTo: "Testing Points",
    description: "General support inquiry about features",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useComplaintStore = create<ComplaintStore>()(
  persist(
    (set, get) => ({
      complaints: sampleComplaints,

      addComplaint: (complaint) => {
        const newComplaint: Complaint = {
          ...complaint,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({
          complaints: [newComplaint, ...state.complaints],
        }))
      },

      updateComplaint: (id, updates) => {
        set((state) => ({
          complaints: state.complaints.map((complaint) =>
            complaint.id === id ? { ...complaint, ...updates, updatedAt: new Date().toISOString() } : complaint,
          ),
        }))
      },

      deleteComplaint: (id) => {
        set((state) => ({
          complaints: state.complaints.filter((complaint) => complaint.id !== id),
        }))
      },

      getComplaintStats: () => {
        const complaints = get().complaints
        return {
          total: complaints.length,
          pending: complaints.filter((c) => c.status === "pending").length,
          inProgress: complaints.filter((c) => c.status === "in-progress").length,
          resolved: complaints.filter((c) => c.status === "resolved").length,
          onHold: complaints.filter((c) => c.status === "on-hold").length,
          inSupport: complaints.filter((c) => c.assignedTo === "Ravi" || c.assignedTo === "Vishal").length,
          inDevelopment: complaints.filter((c) => c.assignedTo === "Mayur" || c.assignedTo === "Purva").length,
          developRunning: complaints.filter(
            (c) => c.status === "in-progress" && (c.assignedTo === "Mayur" || c.assignedTo === "Purva"),
          ).length,
          developPending: complaints.filter(
            (c) => c.status === "pending" && (c.assignedTo === "Mayur" || c.assignedTo === "Purva"),
          ).length,
        }
      },

      getComplaintsByStatus: (status) => {
        return get().complaints.filter((complaint) => complaint.status === status)
      },
    }),
    {
      name: "complaint-store",
    },
  ),
)
