// FILE: frontend/src/pages/registrations/columns.jsx

import { ActionsCell } from '@/components/shared/ActionsCell';

// Defines columns for the participant registrations table
export const pRegisterColumns = ({ handleDelete }) => [
  { 
    header: 'Type', 
    cell: () => 'Participant' 
  },
  { 
    accessorKey: 'event_name', 
    header: 'Event' 
  },
  { 
    accessorKey: 'participant_name', 
    header: 'Participant Name' 
  },
  { 
    accessorKey: 'fee_paid', 
    header: 'Fee Paid', 
    cell: ({ row }) => `$${parseFloat(row.original.fee_paid || 0).toFixed(2)}` 
  },
  { 
    id: 'actions', 
    cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> 
  },
];

// Defines columns for the team registrations table
export const tRegisterColumns = ({ handleDelete }) => [
  { 
    header: 'Type', 
    cell: () => 'Team' 
  },
  { 
    accessorKey: 'event_name', 
    header: 'Event' 
  },
  { 
    accessorKey: 'team_name', 
    header: 'Team Name' 
  },
  { 
    accessorKey: 'fee_paid', 
    header: 'Fee Paid', 
    cell: ({ row }) => `$${parseFloat(row.original.fee_paid || 0).toFixed(2)}` 
  },
  { 
    id: 'actions', 
    cell: ({ row }) => <ActionsCell row={row} handleDelete={handleDelete} /> 
  },
];