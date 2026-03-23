// FILE: frontend/src/pages/evaluations/EvaluationForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';

export const EvaluationForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});
  useEffect(() => { setFormData({ event_id: '', judge_id: '' }); }, [isOpen]);
  const handleSelectChange = (id, value) => setFormData({ ...formData, [id]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/evaluate', formData);
      toast.success(`Judge assigned to event!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>Assign Judge to Event</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <FormSelect endpoint="/events" idKey="event_id" nameKey="event_name" label="Event" onValueChange={(v) => handleSelectChange('event_id', v)} placeholder="Select an Event" required />
          <FormSelect endpoint="/judges" idKey="judge_id" nameKey="jname" label="Judge" onValueChange={(v) => handleSelectChange('judge_id', v)} placeholder="Select a Judge" required />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Assign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};