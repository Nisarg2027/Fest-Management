// FILE: frontend/src/pages/volunteers/VolunteerForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';

export const VolunteerForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) setFormData(item);
    else setFormData({ volunteer_id: '', name: '', email: '', phone_number: '', department: '', event_id: '' });
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (value) => setFormData({ ...formData, event_id: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/volunteers/${item.volunteer_id}`, formData);
        toast.success('Volunteer updated!');
      } else {
        await api.post('/volunteers', formData);
        toast.success('Volunteer created!');
      }
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>{isEditMode ? 'Edit' : 'Create'} Volunteer</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Input id="volunteer_id" placeholder="Volunteer ID" value={formData.volunteer_id || ''} onChange={handleChange} required disabled={isEditMode} />
          <Input id="name" placeholder="Full Name" value={formData.name || ''} onChange={handleChange} required />
          <FormSelect endpoint="/events" idKey="event_id" nameKey="event_name" label="Initial Event" value={formData.event_id} onValueChange={handleSelectChange} placeholder="Select an Event" required />
          <Input id="email" type="email" placeholder="Email" value={formData.email || ''} onChange={handleChange} />
          <Input id="phone_number" placeholder="Phone Number" value={formData.phone_number || ''} onChange={handleChange} />
          <Input id="department" placeholder="Department" value={formData.department || ''} onChange={handleChange} />
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};