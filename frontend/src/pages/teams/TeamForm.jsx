// FILE: frontend/src/pages/teams/TeamForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSelect } from '@/components/shared/FormSelect'; // <--- IMPORT THIS
import { toast } from 'sonner';
import api from '@/lib/api';

export const TeamForm = ({ isOpen, onClose, onSuccess, item }) => {
  const [formData, setFormData] = useState({});
  const isEditMode = Boolean(item);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ team_id: '', team_name: '', team_leader: '' });
    }
  }, [item, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  
  // New handler for the FormSelect component
  const handleSelectChange = (value) => {
    setFormData({ ...formData, team_leader: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/teams/${item.team_id}`, formData);
        toast.success('Team updated!');
      } else {
        await api.post('/teams', formData);
        toast.success('Team created!');
      }
      onSuccess();
    } catch (error) {
      toast.error(`Operation failed: ${error.response?.data?.error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent  className="bg-white">
        <DialogHeader><DialogTitle>{isEditMode ? 'Edit' : 'Create'} Team</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="team_id">Team ID</Label>
            <Input id="team_id" value={formData.team_id || ''} onChange={handleChange} required disabled={isEditMode} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="team_name">Team Name</Label>
            <Input id="team_name" value={formData.team_name || ''} onChange={handleChange} required />
          </div>
          
          
          <div className="grid gap-2">
            <FormSelect
              endpoint="/participants"
              idKey="pname"       
              nameKey="pname"     
              label="Team Leader"
              value={formData.team_leader}
              onValueChange={handleSelectChange} 
              placeholder="Select a registered participant"
              required
            />
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