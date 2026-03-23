// FILE: frontend/src/pages/judges/JudgeForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import api from '@/lib/api';

export const JudgeForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        judge_id: '',
        jname: '',
        contact_number: '',
        organisation: '',
        designation: '',
      });
    }
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/judges/${item.judge_id}`, formData);
        toast.success('Judge updated successfully!');
      } else {
        await api.post('/judges', formData);
        toast.success('Judge created successfully!');
      }
      onSuccess();
    } catch (error) {
      toast.error(`Operation failed: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white border-none'>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Judge' : 'Create New Judge'}</DialogTitle>
          <DialogDescription>Add or update a judge's information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="judge_id">Judge ID</Label>
            <Input id="judge_id" value={formData.judge_id || ''} onChange={handleChange} required disabled={isEditMode} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="jname">Full Name</Label>
            <Input id="jname" placeholder="e.g., Dr. Kapoor" value={formData.jname || ''} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input id="contact_number" value={formData.contact_number || ''} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="organisation">Organisation</Label>
            <Input id="organisation" placeholder="e.g., Tech Univ" value={formData.organisation || ''} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" placeholder="e.g., Professor" value={formData.designation || ''} onChange={handleChange} />
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