// FILE: frontend/src/pages/expenses/ExpenseForm.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/shared/FormSelect";
import { toast } from "sonner";
import api from "@/lib/api";

export const ExpenseForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        expense_id: "",
        event_id: "",
        amount_spend: "",
        expense_desc: "",
      });
    }
  }, [item, isOpen]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (value) =>
    setFormData({ ...formData, event_id: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/expenses/${item.expense_id}`, formData);
        toast.success("Expense updated successfully!");
      } else {
        await api.post("/expenses", formData);
        toast.success("Expense created successfully!");
      }
      onSuccess();
    } catch (error) {
      toast.error(
        `Operation failed: ${error.response?.data?.error || "Unknown error"}`
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        {" "}
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Expense" : "Create New Expense"}
          </DialogTitle>
          <DialogDescription>
            Record an expense for a specific event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="expense_id">Expense ID</Label>
            <Input
              id="expense_id"
              value={formData.expense_id || ""}
              onChange={handleChange}
              required
              disabled={isEditMode}
            />
          </div>

          <FormSelect
            endpoint="/events"
            idKey="event_id"
            nameKey="event_name"
            label="Associated Event"
            value={formData.event_id}
            onValueChange={handleSelectChange}
            placeholder="Select an Event"
            required
          />

          <div className="grid gap-2">
            <Label htmlFor="amount_spend">Amount Spent ($)</Label>
            <Input
              id="amount_spend"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 150.50"
              value={formData.amount_spend || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="expense_desc">Description</Label>
            <Input
              id="expense_desc"
              placeholder="e.g., Stage setup, refreshments"
              value={formData.expense_desc || ""}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
