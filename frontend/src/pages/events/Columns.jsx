// FILE: frontend/src/pages/events/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'event_id', header: 'ID' },
  { accessorKey: 'event_name', header: 'Name' },
  { accessorKey: 'venue', header: 'Venue' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'date', header: 'Date', cell: ({ row }) => new Date(row.original.date).toLocaleDateString() },
  { accessorKey: 'fest_id', header: 'Fest ID' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];