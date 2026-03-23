// FILE: frontend/src/pages/equipments/EquipmentForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import api from '@/lib/api';

export const EquipmentForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        equipment_id: '',
        name: '',
        type: '',
        current_condition: 'Good', // Default value from schema
      });
    }
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (value) => setFormData({ ...formData, current_condition: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/equipments/${item.equipment_id}`, formData);
        toast.success('Equipment updated successfully!');
      } else {
        await api.post('/equipments', formData);
        toast.success('Equipment created successfully!');
      }
      onSuccess();
    } catch (error) {
      toast.error(`Operation failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Equipment' : 'Create New Equipment'}</DialogTitle>
          <DialogDescription>Add or update an item in the equipment inventory.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="equipment_id">Equipment ID</Label>
            <Input id="equipment_id" value={formData.equipment_id || ''} onChange={handleChange} required disabled={isEditMode} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Equipment Name</Label>
            <Input id="name" placeholder="e.g., Projector" value={formData.name || ''} onChange={handleChange} required />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" placeholder="e.g., AV, Audio, IT" value={formData.type || ''} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label>Current Condition</Label>
            <Select onValueChange={handleSelectChange} value={formData.current_condition}>
                <SelectTrigger><SelectValue placeholder="Select a condition" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Service">Needs Service</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};