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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface CreateReportModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CreateReportModal({ open = false, onOpenChange = () => {} }: CreateReportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Custom Report</DialogTitle>
          <DialogDescription>Configure fields and press “Generate” to create a new report.</DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: Replace with real create-report logic
            onOpenChange(false)
          }}
        >
          <Input placeholder="Report name" required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select defaultValue="Complaint Analysis">
              <SelectTrigger>Report type</SelectTrigger>
              <SelectContent>
                <SelectItem value="Complaint Analysis">Complaint Analysis</SelectItem>
                <SelectItem value="Customer Insights">Customer Insights</SelectItem>
                <SelectItem value="Performance Metrics">Performance Metrics</SelectItem>
                <SelectItem value="Custom Query">Custom Query</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="PDF">
              <SelectTrigger>Format</SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
                <SelectItem value="CSV">CSV</SelectItem>
                <SelectItem value="JSON">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="include-charts" defaultChecked />
            <label htmlFor="include-charts" className="text-sm">
              Include charts
            </label>
          </div>

          <Textarea rows={3} placeholder="Optional description…" />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Generate Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
