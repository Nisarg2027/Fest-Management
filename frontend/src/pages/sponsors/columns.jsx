// FILE: frontend/src/pages/sponsors/columns.jsx
import { ActionsCell } from '@/components/shared/ActionsCell';
export const columns = ({ handleEdit, handleDelete }) => [
  { accessorKey: 'sponsor_id', header: 'ID' },
  { accessorKey: 'sname', header: 'Sponsor Name' },
  { accessorKey: 'company', header: 'Company' },
  { accessorKey: 'sponsorship_type', header: 'Type' },
  { accessorKey: 'contact_details', header: 'Contact' },
  { id: 'actions', cell: ({ row }) => <ActionsCell row={row} handleEdit={handleEdit} handleDelete={handleDelete} /> },
];