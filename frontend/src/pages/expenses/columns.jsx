// FILE: frontend/src/pages/expenses/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'expense_id', header: 'ID' },
  { accessorKey: 'event_id', header: 'Event ID' },
  { accessorKey: 'amount_spend', header: 'Amount', cell: ({ row }) => `$${parseFloat(row.original.amount_spend || 0).toLocaleString()}` },
  { accessorKey: 'expense_desc', header: 'Description' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];