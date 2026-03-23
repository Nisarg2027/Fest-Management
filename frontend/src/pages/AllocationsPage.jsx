// FILE: frontend/src/pages/AllocationsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as allocationColumns } from './allocations/columns';
import { AllocationForm } from './allocations/AllocationForm';

const AllocationsPage = () => {
  const crud = useCrud('/allocated', ['event_id', 'equipment_id']);
  return <CrudPage title="Equipment Allocations" {...crud} columns={allocationColumns(crud)} FormComponent={AllocationForm} />;
};
export default AllocationsPage;