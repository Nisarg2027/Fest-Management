// FILE: frontend/src/pages/scores/ScoreForm.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ScoreForm = ({ isOpen, onClose, onSuccess }) => {
  const [pFormData, setPFormData] = useState({});
  const [tFormData, setTFormData] = useState({});

  useEffect(() => {
    setPFormData({ judge_id: '', participant_id: '', score: '', remark: '' });
    setTFormData({ judge_id: '', team_id: '', score: '', remark: '' });
  }, [isOpen]);

  const handlePSelect = (id, value) => setPFormData({ ...pFormData, [id]: value });
  const handlePChange = (e) => setPFormData({ ...pFormData, [e.target.id]: e.target.value });
  
  const handleTSelect = (id, value) => setTFormData({ ...tFormData, [id]: value });
  const handleTChange = (e) => setTFormData({ ...tFormData, [e.target.id]: e.target.value });

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const data = type === 'participant' ? pFormData : tFormData;
    const score = parseFloat(data.score);
    if (score < 0 || score > 100) {
    toast.error('Score must be between 0 and 100.');
    return;
}
    const endpoint = type === 'participant' ? '/pscore' : '/tscore';
    try {
      await api.post(endpoint, data);
      toast.success(`Score added successfully!`);
      onSuccess();
    } catch (error) { toast.error(`Operation failed: ${error.response?.data?.error}`); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white border-none'>
        <DialogHeader><DialogTitle>Add Score</DialogTitle></DialogHeader>
        <Tabs defaultValue="participant">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="participant">For Participant</TabsTrigger>
                <TabsTrigger value="team">For Team</TabsTrigger>
            </TabsList>
            <TabsContent value="participant">
                <form onSubmit={(e) => handleSubmit(e, 'participant')} className="grid gap-4 py-4">
                    <FormSelect endpoint="/judges" idKey="judge_id" nameKey="jname" label="Judge" onValueChange={(v) => handlePSelect('judge_id', v)} placeholder="Select a Judge" required />
                    <FormSelect endpoint="/participants" idKey="participant_id" nameKey="pname" label="Participant" onValueChange={(v) => handlePSelect('participant_id', v)} placeholder="Select a Participant" required />
                    <Input id="score" type="number" step="0.01" min="0" max="100" placeholder="Score (0-100)" value={pFormData.score || ''} onChange={handlePChange} required />
                    <Input id="remark" placeholder="Remark" value={pFormData.remark || ''} onChange={handlePChange} />
                    <DialogFooter><Button type="submit">Save Score</Button></DialogFooter>
                </form>
            </TabsContent>
            <TabsContent value="team">
                <form onSubmit={(e) => handleSubmit(e, 'team')} className="grid gap-4 py-4">
                    <FormSelect endpoint="/judges" idKey="judge_id" nameKey="jname" label="Judge" onValueChange={(v) => handleTSelect('judge_id', v)} placeholder="Select a Judge" required />
                    <FormSelect endpoint="/teams" idKey="team_id" nameKey="team_name" label="Team" onValueChange={(v) => handleTSelect('team_id', v)} placeholder="Select a Team" required />
                    <Input id="score" type="number" step="0.01" min="0" max="100" placeholder="Score (0-100)" value={tFormData.score || ''} onChange={handleTChange} required />
                    <Input id="remark" placeholder="Remark" value={tFormData.remark || ''} onChange={handleTChange} />
                    <DialogFooter><Button type="submit">Save Score</Button></DialogFooter>
                </form>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};