// FILE: frontend/src/pages/ParticipantsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as participantColumns } from "./participants/columns";
import { ParticipantForm } from "./participants/ParticipantForm";


const ParticipantsPage = () => {
  // Use the custom hook to handle all CRUD logic for the '/participants' endpoint
  const crud = useCrud('/participants', 'participant_id');

  // Render the reusable CrudPage component with props specific to Participants
  return (
    <CrudPage
      title="Manage Participants"
      {...crud} // Pass down all state and handlers from the hook
      columns={participantColumns(crud)} // Pass the column definitions, injecting the handlers
      FormComponent={ParticipantForm} // Specify which form component to use
    />
  );
};

export default ParticipantsPage;