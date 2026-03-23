// FILE: frontend/src/pages/support/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleDelete }) => [
  { accessorKey: 'event_name', header: 'Event' },
  { accessorKey: 'sponsor_name', header: 'Sponsor' },
  { accessorKey: 'amount_distributed', header: 'Amount', cell: ({ row }) => `$${parseFloat(row.original.amount_distributed || 0).toFixed(2)}` },
  { accessorKey: 'contract_date', header: 'Contract Date', cell: ({ row }) => new Date(row.original.contract_date).toLocaleDateString() },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> },
];