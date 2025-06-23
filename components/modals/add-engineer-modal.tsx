"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export interface AddEngineerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddEngineerModal({ open, onOpenChange }: AddEngineerModalProps) {
  async function handleSubmit(formData: FormData) {
    // TODO: replace with server action or store update
    console.log("new engineer →", Object.fromEntries(formData.entries()))
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Engineer</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input name="fullName" id="fullName" placeholder="Ravi Kumar" required />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>
              <Input name="role" id="role" placeholder="Support Engineer" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="engineer@actosoft.com" required />
            </div>

            <div>
              <Label htmlFor="skills">Key skills</Label>
              <Input name="skills" id="skills" placeholder="AWS, React, SQL" required />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Short bio / notes</Label>
            <Textarea id="bio" name="bio" placeholder="Optional notes about the engineer…" className="min-h-[80px]" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-gray-100 text-gray-700"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Engineer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEngineerModal
