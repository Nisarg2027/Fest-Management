// FILE: frontend/src/pages/fests/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';

export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'fest_id', header: 'ID' },
  { accessorKey: 'fest_name', header: 'Name' },
  { accessorKey: 'start_date', header: 'Start Date', cell: ({ row }) => new Date(row.original.start_date).toLocaleDateString() },
  { accessorKey: 'end_date', header: 'End Date', cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString() },
  { accessorKey: 'year', header: 'Year' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} deleteWarning="This will delete the fest and all associated events, registrations, etc." /> },
];