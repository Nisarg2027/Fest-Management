// FILE: frontend/src/pages/Dashboard.jsx
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PartyPopper, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { useCrud } from '@/hooks/useCrud';

// Enhanced StatCard component with better visual design
const StatCard = ({ title, value, Icon, loading, trend, description }) => (
  <Card className="group relative overflow-hidden border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    {/* Accent border */}
    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
    
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-medium text-gray-600">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="space-y-2">
          <div className="h-7 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-800">{value}</div>
        </div>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // --- Data Fetching ---
  const { data: fests, loading: festsLoading } = useCrud('/fests', 'fest_id');
  const { data: events, loading: eventsLoading } = useCrud('/events', 'event_id');
  const { data: participants, loading: participantsLoading } = useCrud('/participants', 'participant_id');
  const { data: expenses, loading: expensesLoading } = useCrud('/expenses', 'expense_id');

  // --- Derived State & Memoization ---
  const totalExpenses = useMemo(() => 
    expenses.reduce((acc, curr) => acc + parseFloat(curr.amount_spend || 0), 0),
    [expenses]
  );

  const averageParticipants = useMemo(() => 
    events.length > 0 ? Math.round(participants.length / events.length) : 0,
    [events.length, participants.length]
  );

  // --- UI Configuration (Data-Driven Approach) ---
  const statsConfig = [
    {
      title: "Total Fests",
      value: fests.length,
      Icon: PartyPopper,
      loading: festsLoading,
      description: `${events.length} events scheduled`
    },
    {
      title: "Total Events",
      value: events.length,
      Icon: Calendar,
      loading: eventsLoading,
      description: `${averageParticipants} avg participants`
    },
    {
      title: "Total Participants",
      value: participants.length.toLocaleString(),
      Icon: Users,
      loading: participantsLoading,
      description: "Across all events"
    },
    {
      title: "Total Expenses",
      value: `₹ ${totalExpenses.toLocaleString('en-US')}`,
      Icon: DollarSign,
      loading: expensesLoading,
      description: "Total budget spent"
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Enhanced Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive overview of your fest activities and statistics
            </p>
          </div>
        </div>
      </div>
      
      {/* --- Enhanced Stats Grid --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            Icon={stat.Icon}
            loading={stat.loading}
            description={stat.description}
          />
        ))}
      </div>
        <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Welcome to the Fest Management System. Use the sidebar to navigate and manage different aspects of your fests.</p>
                    </CardContent>
                </Card>
            </div>
    </div>
  );
};

export default Dashboard;