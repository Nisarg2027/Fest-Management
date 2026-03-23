// FILE: frontend/src/pages/support/SupportForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';

export const SupportForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({ event_id: '', sponsor_id: '', amount_distributed: '', contract_date: '' });
  }, [isOpen]);

  const handleSelectChange = (id, value) => setFormData({ ...formData, [id]: value });
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/support', formData);
      toast.success(`Sponsor support added!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>Add Sponsor Support</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <FormSelect endpoint="/events" idKey="event_id" nameKey="event_name" label="Event" onValueChange={(v) => handleSelectChange('event_id', v)} placeholder="Select an Event" required />
          <FormSelect endpoint="/sponsors" idKey="sponsor_id" nameKey="sname" label="Sponsor" onValueChange={(v) => handleSelectChange('sponsor_id', v)} placeholder="Select a Sponsor" required />
          <Input id="amount_distributed" type="number" placeholder="Amount" value={formData.amount_distributed || ''} onChange={handleChange} required />
          <Input id="contract_date" type="date" value={formData.contract_date || ''} onChange={handleChange} />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};