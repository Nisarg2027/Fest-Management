// FILE: frontend/src/pages/allocations/AllocationForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';

export const AllocationForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({ event_id: '', equipment_id: '', how_long: '' });
  }, [isOpen]);

  const handleSelectChange = (id, value) => setFormData({ ...formData, [id]: value });
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/allocated', formData);
      toast.success(`Equipment allocated successfully!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>Allocate Equipment to Event</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <FormSelect endpoint="/events" idKey="event_id" nameKey="event_name" label="Event" onValueChange={(v) => handleSelectChange('event_id', v)} placeholder="Select an Event" required />
          <FormSelect endpoint="/equipments" idKey="equipment_id" nameKey="name" label="Equipment" onValueChange={(v) => handleSelectChange('equipment_id', v)} placeholder="Select Equipment" required />
          <Input id="how_long" placeholder="Duration (e.g., 2 hours)" value={formData.how_long || ''} onChange={handleChange} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Allocate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};