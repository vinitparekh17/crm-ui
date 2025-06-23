"use client"

import { useState, type FormEvent } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useComplaintStore } from "@/lib/stores/complaint-store"

interface RegisterComplaintModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegisterComplaintModal({ open, onOpenChange }: RegisterComplaintModalProps) {
  const addComplaint = useComplaintStore((s) => s.addComplaint)

  const [customerName, setCustomerName] = useState("")
  const [issueType, setIssueType] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high" | "critical">("medium")
  const [description, setDescription] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Basic validation
    if (!customerName || !issueType || !priority) return

    addComplaint({
      customerName,
      issueType,
      priority,
      description,
      status: "pending",
      assignedTo: "",
      customerEmail: "",
    })

    // Clear & close
    setCustomerName("")
    setIssueType("")
    setPriority("medium")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Register New Complaint</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select value={issueType} onValueChange={setIssueType} required>
              <SelectTrigger>
                <SelectValue placeholder="Issue Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical Support">Technical Support</SelectItem>
                <SelectItem value="Bug Report">Bug Report</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
                <SelectItem value="Account Issue">Account Issue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priority} onValueChange={(v: "low" | "medium" | "high" | "critical") =>
              setPriority(v)} required>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Describe the issue…"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
