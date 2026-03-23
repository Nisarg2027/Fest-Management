// FILE: frontend/src/pages/TeamsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as teamColumns } from './teams/columns';
import { TeamForm } from './teams/TeamForm';

const TeamsPage = () => {
  const crud = useCrud('/teams', 'team_id');
  return <CrudPage title="Manage Teams" {...crud} columns={teamColumns(crud)} FormComponent={TeamForm} />;
};
export default TeamsPage;