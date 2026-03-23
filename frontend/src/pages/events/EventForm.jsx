// FILE: frontend/src/pages/events/EventForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';

export const EventForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      setFormData({ ...item, date: item.date ? new Date(item.date).toISOString().split('T')[0] : '' });
    } else {
      setFormData({ event_id: '', event_name: '', venue: '', date: '', category: '', short_desc: '', time: '', fest_id: '' });
    }
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (id, value) => setFormData({ ...formData, [id]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) await api.put(`/events/${item.event_id}`, formData);
      else await api.post('/events', formData);
      toast.success(`Event ${isEditMode ? 'updated' : 'created'}!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>{isEditMode ? 'Edit' : 'Create'} Event</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input id="event_id" placeholder="Event ID" value={formData.event_id || ''} onChange={handleChange} required disabled={isEditMode} />
          <Input id="event_name" placeholder="Event Name" value={formData.event_name || ''} onChange={handleChange} required />
          <FormSelect endpoint="/fests" idKey="fest_id" nameKey="fest_name" label="Fest" value={formData.fest_id} onValueChange={(v) => handleSelectChange('fest_id', v)} placeholder="Select a Fest" required />
          <Input id="venue" placeholder="Venue" value={formData.venue || ''} onChange={handleChange} />
          <Input id="date" type="date" value={formData.date || ''} onChange={handleChange} />
          <Input id="time" placeholder="Time (e.g., 09:00 - 11:00)" value={formData.time || ''} onChange={handleChange} />
          <Input id="category" placeholder="Category" value={formData.category || ''} onChange={handleChange} />
          <Input id="short_desc" placeholder="Short Description" value={formData.short_desc || ''} onChange={handleChange} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};