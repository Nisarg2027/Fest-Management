// FILE: frontend/src/pages/equipments/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'equipment_id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'current_condition', header: 'Condition' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];