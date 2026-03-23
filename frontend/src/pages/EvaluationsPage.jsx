// FILE: frontend/src/pages/EvaluationsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as evaluationColumns } from './evaluations/columns';
import { EvaluationForm } from './evaluations/EvaluationForm';

const EvaluationsPage = () => {
  const crud = useCrud('/evaluate', ['event_id', 'judge_id']);
  return <CrudPage title="Judge Assignments" {...crud} columns={evaluationColumns(crud)} FormComponent={EvaluationForm} />;
};
export default EvaluationsPage;