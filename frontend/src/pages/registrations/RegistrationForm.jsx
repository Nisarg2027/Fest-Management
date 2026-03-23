// FILE: frontend/src/pages/registrations/RegistrationForm.jsx

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormSelect } from '@/components/shared/FormSelect';
import { toast } from 'sonner';
import api from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';

export const RegistrationForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [registrationType, setRegistrationType] = useState('participant');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [allParticipants, setAllParticipants] = useState([]);

  useEffect(() => {
    if (isOpen) {
        api.get('/participants').then(res => setAllParticipants(res.data));
    }
  }, [isOpen]);
  
  useEffect(() => {
    setFormData({
      event_id: '',
      participant_id: '',
      team_id: '',
      fee_paid: '',
      registration_date: new Date().toISOString().split('T')[0],
    });
    setSelectedEvent(null);
    setSelectedParticipant(null);
  }, [isOpen]);

  const handleEventSelect = async (eventId) => {
    if (!eventId) {
      setSelectedEvent(null);
      setFormData(prev => ({...prev, event_id: ''}));
      return;
    }
    setFormData(prev => ({...prev, event_id: eventId}));
    try {
      const res = await api.get(`/events/${eventId}`);
      setSelectedEvent(res.data);
    } catch (error) {
      toast.error("Could not fetch event details.");
      setSelectedEvent(null);
    }
  };
  
  const handleParticipantSelect = (participantId) => {
    setFormData(prev => ({...prev, participant_id: participantId}));
    const participant = allParticipants.find(p => p.participant_id === participantId);
    setSelectedParticipant(participant || null);
  };
  
  const validateRegistration = () => {
    if (!selectedEvent || !selectedParticipant) return true;

    if (selectedEvent.allowed_gender && selectedEvent.allowed_gender !== 'Any') {
      if (selectedParticipant.gender !== selectedEvent.allowed_gender) {
        toast.error(`Validation Failed: This event is only for ${selectedEvent.allowed_gender} participants.`);
        return false;
      }
    }

    if (selectedEvent.min_age && selectedEvent.min_age > 0) {
      if (!selectedParticipant.dob) {
        toast.error("Validation Failed: Cannot check age because participant's Date of Birth is missing.");
        return false;
      }
      const today = new Date();
      const birthDate = new Date(selectedParticipant.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < selectedEvent.min_age) {
        toast.error(`Validation Failed: Participant must be at least ${selectedEvent.min_age} years old for this event.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationType === 'participant' && !validateRegistration()) return;

    const endpoint = registrationType === 'participant' ? '/pregister' : '/tregister';
    const payload = { ...formData };
    
    // Clean up payload so we don't send irrelevant IDs
    if(registrationType === 'participant') {
        delete payload.team_id;
    } else {
        delete payload.participant_id;
    }

    try {
      await api.post(endpoint, payload);
      toast.success(`Registration successful!`);
      onSuccess();
    } catch (error) {
      toast.error(`Registration failed: ${error.response?.data?.error || 'An error occurred'}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-none">
        <DialogHeader><DialogTitle>Add New Registration</DialogTitle></DialogHeader>
        <Tabs value={registrationType} onValueChange={setRegistrationType} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="participant">Participant</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                    <FormSelect endpoint="/events" idKey="event_id" nameKey="event_name" label="Event" onValueChange={handleEventSelect} placeholder="Select an Event" required />
                    
                    {selectedEvent && (selectedEvent.min_age > 0 || (selectedEvent.allowed_gender && selectedEvent.allowed_gender !== 'Any')) && (
                        <Alert>
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                                Event Rules:
                                {selectedEvent.min_age > 0 && ` Minimum age is ${selectedEvent.min_age}.`}
                                {selectedEvent.allowed_gender && selectedEvent.allowed_gender !== 'Any' && ` Gender must be ${selectedEvent.allowed_gender}.`}
                            </AlertDescription>
                        </Alert>
                    )}

                    <TabsContent value="participant" className="space-y-4 m-0 p-0">
                        <FormSelect endpoint="/participants" idKey="participant_id" nameKey="pname" label="Participant" onValueChange={handleParticipantSelect} placeholder="Select a Participant" required={registrationType === 'participant'} />
                    </TabsContent>
                    <TabsContent value="team" className="space-y-4 m-0 p-0">
                        <FormSelect endpoint="/teams" idKey="team_id" nameKey="team_name" label="Team" onValueChange={(v) => setFormData(prev => ({...prev, team_id: v}))} placeholder="Select a Team" required={registrationType === 'team'} />
                    </TabsContent>

                    <Input id="fee_paid" type="number" min="0" step="0.01" placeholder="Fee Paid" value={formData.fee_paid || ''} onChange={(e) => setFormData(prev => ({...prev, fee_paid: e.target.value}))} required />
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Register</Button>
                </DialogFooter>
            </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};