// FILE: frontend/src/pages/judges/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'judge_id', header: 'ID' },
  { accessorKey: 'jname', header: 'Name' },
  { accessorKey: 'organisation', header: 'Organisation' },
  { accessorKey: 'designation', header: 'Designation' },
  { accessorKey: 'contact_number', header: 'Contact' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];