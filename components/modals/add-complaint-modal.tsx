"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useComplaintStore, Complaint } from "@/lib/stores/complaint-store"

export interface AddComplaintModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddComplaintModal({ open, onOpenChange }: AddComplaintModalProps) {
  const { addComplaint } = useComplaintStore()
  const [form, setForm] = useState<Complaint>({
    id: "",
    customerName: "",
    customerEmail: "",
    issueType: "",
    priority: "medium",
    description: "",
    status: "pending",
    assignedTo: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const handleChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value })

  const handleSubmit = () => {
    if (!form.customerName || !form.issueType) return
    addComplaint(form) // <-- your store should accept this shape
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New Complaint
          </DialogTitle>
          <DialogDescription>Fill out the form below and click “Create”.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input placeholder="Customer name" value={form.customerName} onChange={handleChange("customerName")} />
          <Input placeholder="Customer email" value={form.customerEmail} onChange={handleChange("customerEmail")} />
          <Select value={form.issueType} onValueChange={(v) => setForm({ ...form, issueType: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Issue type" />
            </SelectTrigger>
            <SelectContent>
              {["Login Issue", "Bug Report", "Feature Request", "Support Request", "Account Issue"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={form.priority}
            onValueChange={(v: "low" | "medium" | "high" | "critical") =>
              setForm({ ...form, priority: v })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {["Critical", "High", "Medium", "Low"].map((p) => (
                <SelectItem key={p} value={p.toLowerCase() as "low" | "medium" | "high" | "critical"}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Describe the issue…"
            rows={3}
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
