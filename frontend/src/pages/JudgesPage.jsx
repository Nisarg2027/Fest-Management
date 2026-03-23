// FILE: frontend/src/pages/JudgesPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as judgeColumns } from './judges/columns';
import { JudgeForm } from './judges/JudgeForm'; // Assuming you create this form

const JudgesPage = () => {
  const crud = useCrud('/judges', 'judge_id');
  return <CrudPage title="Manage Judges" {...crud} columns={judgeColumns(crud)} FormComponent={JudgeForm} />;
};
export default JudgesPage;