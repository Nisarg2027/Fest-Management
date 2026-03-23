// FILE: frontend/src/pages/AssignmentsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as assignmentColumns } from './assignments/columns';
import { AssignmentForm } from './assignments/AssignmentForm';

const AssignmentsPage = () => {
  const crud = useCrud('/assign', ['volunteer_id', 'event_id']);
  return <CrudPage title="Volunteer Assignments" {...crud} columns={assignmentColumns(crud)} FormComponent={AssignmentForm} />;
};
export default AssignmentsPage;