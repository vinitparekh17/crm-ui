"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"

interface ScheduleReportModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ScheduleReportModal({ open = false, onOpenChange = () => {} }: ScheduleReportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule Report</DialogTitle>
          <DialogDescription>Pick a template, frequency, and recipients for automated delivery.</DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: Replace with real scheduling logic
            onOpenChange(false)
          }}
        >
          <Select defaultValue="">
            <SelectTrigger>Select template</SelectTrigger>
            <SelectContent>
              <SelectItem value="Weekly Complaint Summary">Weekly Complaint Summary</SelectItem>
              <SelectItem value="Monthly Customer Report">Monthly Customer Report</SelectItem>
              <SelectItem value="Performance Dashboard">Performance Dashboard</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="Weekly">
            <SelectTrigger>Frequency</SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>

          <Input type="time" defaultValue="09:00" />

          <Input type="email" placeholder="Recipients (comma-separated)" required />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Save Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
