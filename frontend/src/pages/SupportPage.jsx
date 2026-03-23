// FILE: frontend/src/pages/SupportPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as supportColumns } from './support/columns';
import { SupportForm } from './support/SupportForm';

const SupportPage = () => {
  const crud = useCrud('/support', ['event_id', 'sponsor_id']);
  return <CrudPage title="Sponsor Support" {...crud} columns={supportColumns(crud)} FormComponent={SupportForm} />;
};
export default SupportPage;