// FILE: frontend/src/pages/fests/FestForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/lib/api';

export const FestForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      const formattedItem = { ...item,
        start_date: item.start_date ? new Date(item.start_date).toISOString().split('T')[0] : '',
        end_date: item.end_date ? new Date(item.end_date).toISOString().split('T')[0] : '',
      };
      setFormData(formattedItem);
    } else {
      setFormData({ fest_id: '', fest_name: '', start_date: '', end_date: '', year: '' });
    }
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      toast.error('End date cannot be before start date.');
      return;
    }
    try {
      if (isEditMode) {
        await api.put(`/fests/${item.fest_id}`, formData);
        toast.success('Fest updated successfully!');
      } else {
        await api.post('/fests', formData);
        toast.success('Fest created successfully!');
      }
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white border-none'>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Fest' : 'Create New Fest'}</DialogTitle>
          <DialogDescription>Fill in the details for the fest.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fest_id">Fest ID</Label>
            <Input id="fest_id" value={formData.fest_id || ''} onChange={handleChange} required disabled={isEditMode} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fest_name">Fest Name</Label>
            <Input id="fest_name" value={formData.fest_name || ''} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input id="start_date" type="date" value={formData.start_date || ''} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input id="end_date" type="date" value={formData.end_date || ''} onChange={handleChange} required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" type="number" placeholder="2025" value={formData.year || ''} onChange={handleChange} required />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};