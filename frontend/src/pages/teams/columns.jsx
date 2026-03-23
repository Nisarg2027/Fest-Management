// FILE: frontend/src/pages/teams/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'team_id', header: 'ID' },
  { accessorKey: 'team_name', header: 'Team Name' },
  { accessorKey: 'team_leader', header: 'Team Leader' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];

