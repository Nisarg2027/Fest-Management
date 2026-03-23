// FILE: frontend/src/pages/EquipmentsPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as equipmentColumns } from './equipments/columns';
import { EquipmentForm } from './equipments/EquipmentForm'; // Assuming you create this form

const EquipmentsPage = () => {
  const crud = useCrud('/equipments', 'equipment_id');
  return <CrudPage title="Manage Equipment" {...crud} columns={equipmentColumns(crud)} FormComponent={EquipmentForm} />;
};
export default EquipmentsPage;