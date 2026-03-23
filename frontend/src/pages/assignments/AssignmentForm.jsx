// FILE: frontend/src/pages/assignments/AssignmentForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';

export const AssignmentForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item); // Note: We are not implementing edit for this example

  useEffect(() => {
    setFormData({ volunteer_id: '', event_id: '', shift_timings: '', assignment_role: '' });
  }, [isOpen]);

  const handleSelectChange = (id, value) => setFormData({ ...formData, [id]: value });
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/assign', formData);
      toast.success(`Volunteer assigned successfully!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>Assign Volunteer to Event</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <FormSelect endpoint="/volunteers" idKey="volunteer_id" nameKey="name" label="Volunteer" onValueChange={(v) => handleSelectChange('volunteer_id', v)} placeholder="Select a Volunteer" required />
          <FormSelect endpoint="/events" idKey="event_id" nameKey="event_name" label="Event" onValueChange={(v) => handleSelectChange('event_id', v)} placeholder="Select an Event" required />
          <Input id="assignment_role" placeholder="Role (e.g., Stage Manager)" value={formData.assignment_role || ''} onChange={handleChange} required />
          <Input id="shift_timings" placeholder="Shift Timings (e.g., 09:00-13:00)" value={formData.shift_timings || ''} onChange={handleChange} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Assign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};