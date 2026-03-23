// FILE: frontend/src/pages/participants/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'participant_id', header: 'ID' },
  { accessorKey: 'pname', header: 'Name' },
  { accessorKey: 'pemail', header: 'Email' },
  { accessorKey: 'phone_no', header: 'Phone' },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'gender', header: 'Gender' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];