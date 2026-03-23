// FILE: frontend/src/pages/RegistrationsPage.jsx
import { useState } from 'react';
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the form and column definitions
import { RegistrationForm } from './registrations/RegistrationForm';
import { pRegisterColumns, tRegisterColumns } from './registrations/columns';

const RegistrationsPage = () => {
  // Use the CRUD hook to interact with the ACTUAL TABLES, not the views
  const pRegs = useCrud('/pregister', ['event_id', 'participant_id']);
  const tRegs = useCrud('/tregister', ['event_id', 'team_id']);
  
  // State to control the form's visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  // This function will be passed to the form. When the form is successful,
  // it closes the form and tells the hooks to refetch the data.
  const handleFormSuccess = () => {
    setIsFormOpen(false);
    pRegs.fetchData();
    tRegs.fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Registrations</h1>
        {/* The "Add New" button that was missing */}
        <Button onClick={() => setIsFormOpen(true)} className="bg-blue-600 text-white">
          <PlusCircle className="mr-2 h-4 w-4" /> Register here!
        </Button>
      </div>

      <Tabs defaultValue="participants">
        <TabsList>
          <TabsTrigger value="participants">Participant Registrations</TabsTrigger>
          <TabsTrigger value="teams">Team Registrations</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
          {/* Use the reusable CrudPage component to display the data and handle loading state */}
          <CrudPage
            title="" // Title is already at the top, so we leave this blank
            data={pRegs.data}
            columns={pRegisterColumns({ handleDelete: pRegs.handleDelete })} // Pass the delete handler to the columns
            loading={pRegs.loading}
          />
        </TabsContent>
        <TabsContent value="teams">
          <CrudPage
            title=""
            data={tRegs.data}
            columns={tRegisterColumns({ handleDelete: tRegs.handleDelete })}
            loading={tRegs.loading}
          />
        </TabsContent>
      </Tabs>

      {/* The Registration Form component, controlled by our state */}
      <RegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

export default RegistrationsPage;