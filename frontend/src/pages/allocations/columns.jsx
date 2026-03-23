// FILE: frontend/src/pages/allocations/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleDelete }) => [
  { accessorKey: 'event_name', header: 'Event' },
  { accessorKey: 'equipment_name', header: 'Equipment' },
  { accessorKey: 'how_long', header: 'Duration' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> },
];