// FILE: frontend/src/pages/volunteers/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';

export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'volunteer_id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone_number', header: 'Phone' },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'event_id', header: 'Event ID' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];