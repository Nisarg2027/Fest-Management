// FILE: frontend/src/pages/evaluations/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleDelete }) => [
  { accessorKey: 'event_name', header: 'Event' },
  { accessorKey: 'judge_name', header: 'Judge' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> },
];