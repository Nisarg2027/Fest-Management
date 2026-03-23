// FILE: frontend/src/pages/assignments/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleDelete }) => [
  { accessorKey: 'volunteer_name', header: 'Volunteer' },
  { accessorKey: 'event_name', header: 'Event' },
  { accessorKey: 'assignment_role', header: 'Role' },
  { accessorKey: 'shift_timings', header: 'Shift' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> }, // No Edit for junction tables for simplicity
];