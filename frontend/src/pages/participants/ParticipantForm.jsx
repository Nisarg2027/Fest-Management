// FILE: frontend/src/pages/participants/ParticipantForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import api from '@/lib/api';

export const ParticipantForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      const formattedItem = { ...item,
        dob: item.dob ? new Date(item.dob).toISOString().split('T')[0] : '',
      };
      setFormData(formattedItem);
    } else {
      setFormData({
        participant_id: '',
        pname: '',
        pemail: '',
        phone_no: '',
        dob: '',
        department: '',
        gender: '',
      });
    }
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSelectChange = (value) => setFormData({ ...formData, gender: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/participants/${item.participant_id}`, formData);
        toast.success('Participant updated successfully!');
      } else {
        await api.post('/participants', formData);
        toast.success('Participant created successfully!');
      }
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error || 'Unknown error'}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Participant' : 'Create New Participant'}</DialogTitle>
          <DialogDescription>Fill in the participant's details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="participant_id">Participant ID</Label>
            <Input id="participant_id" value={formData.participant_id || ''} onChange={handleChange} required disabled={isEditMode} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pname">Full Name</Label>
            <Input id="pname" value={formData.pname || ''} onChange={handleChange} required />
          </div>
           <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="pemail">Email Address</Label>
                <Input id="pemail" type="email" value={formData.pemail || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone_no">Phone Number</Label>
                <Input id="phone_no" value={formData.phone_no || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={formData.dob || ''} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={formData.department || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Gender</Label>
            <Select onValueChange={handleSelectChange} value={formData.gender}>
                <SelectTrigger><SelectValue placeholder="Select a gender" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};