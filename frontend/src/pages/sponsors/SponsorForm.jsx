// FILE: frontend/src/pages/sponsors/SponsorForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import api from '@/lib/api';

export const SponsorForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);
  useEffect(() => {
    if (item) setFormData(item);
    else setFormData({ sponsor_id: '', sname: '', company: '', sponsorship_type: '', contact_details: '' });
  }, [item, isOpen]);
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) await api.put(`/sponsors/${item.sponsor_id}`, formData);
      else await api.post('/sponsors', formData);
      toast.success(`Sponsor ${isEditMode ? 'updated' : 'created'}!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>{isEditMode ? 'Edit' : 'Create'} Sponsor</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Input id="sponsor_id" placeholder="Sponsor ID" value={formData.sponsor_id || ''} onChange={handleChange} required disabled={isEditMode} />
          <Input id="sname" placeholder="Sponsor Name" value={formData.sname || ''} onChange={handleChange} required />
          <Input id="company" placeholder="Company" value={formData.company || ''} onChange={handleChange} />
          <Input id="sponsorship_type" placeholder="Sponsorship Type (e.g., Gold, Media)" value={formData.sponsorship_type || ''} onChange={handleChange} />
          <Input id="contact_details" placeholder="Contact Details (Email/Phone)" value={formData.contact_details || ''} onChange={handleChange} required />
          <DialogFooter className="pt-2"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit">Save</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};