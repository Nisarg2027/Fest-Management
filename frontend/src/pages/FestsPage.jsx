// FILE: frontend/src/pages/FestsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as festColumns } from './fests/Columns';
import { FestForm } from './fests/FestForms';

const FestsPage = () => {
  const crud = useCrud('/fests', 'fest_id');
  return <CrudPage title="Manage Fests" {...crud} columns={festColumns(crud)} FormComponent={FestForm} />;
};
export default FestsPage;