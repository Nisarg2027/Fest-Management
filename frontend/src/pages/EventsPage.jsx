// FILE: frontend/src/pages/[Entity]Page.jsx
// EXAMPLE: frontend/src/pages/EventsPage.jsx

import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as eventColumns } from './events/Columns'; // Change this
import { EventForm } from './events/EventForm'; // Change this

const EventsPage = () => {
  const crud = useCrud('/events', 'event_id'); // Change endpoint and ID
  return <CrudPage title="Manage Events" {...crud} columns={eventColumns(crud)} FormComponent={EventForm} />; // Change title and components
};
export default EventsPage;