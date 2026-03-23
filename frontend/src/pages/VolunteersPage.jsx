// FILE: frontend/src/pages/VolunteersPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as volunteerColumns } from './volunteers/columns';
import { VolunteerForm } from './volunteers/VolunteerForm';

const VolunteersPage = () => {
  const crud = useCrud('/volunteers', 'volunteer_id');
  return <CrudPage title="Manage Volunteers" {...crud} columns={volunteerColumns(crud)} FormComponent={VolunteerForm} />;
};
export default VolunteersPage;