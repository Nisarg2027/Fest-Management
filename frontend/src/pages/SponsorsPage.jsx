// FILE: frontend/src/pages/SponsorsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as sponsorColumns } from './sponsors/columns';
import { SponsorForm } from './sponsors/SponsorForm';

const SponsorsPage = () => {
  const crud = useCrud('/sponsors', 'sponsor_id');
  return <CrudPage title="Manage Sponsors" {...crud} columns={sponsorColumns(crud)} FormComponent={SponsorForm} />;
};
export default SponsorsPage;