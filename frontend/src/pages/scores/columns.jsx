// FILE: frontend/src/pages/scores/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const pscoreColumns = ({ handleDelete }) => [
  { accessorKey: 'participant_name', header: 'Participant' },
  { accessorKey: 'judge_name', header: 'Judge' },
  { accessorKey: 'score', header: 'Score' },
  { accessorKey: 'remark', header: 'Remark' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> },
];

export const tscoreColumns = ({ handleDelete }) => [
    { accessorKey: 'team_name', header: 'Team' },
    { accessorKey: 'judge_name', header: 'Judge' },
    { accessorKey: 'score', header: 'Score' },
    { accessorKey: 'remark', header: 'Remark' },
    { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> },
  ];