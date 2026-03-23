// FILE: frontend/src/pages/ScoresPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { pscoreColumns, tscoreColumns } from './scores/columns';
import { ScoreForm } from './scores/ScoreForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const ScoresPage = () => {
  const pScores = useCrud('/pscore', ['judge_id', 'participant_id']);
  const tScores = useCrud('/tscore', ['judge_id', 'team_id']);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    pScores.fetchData();
    tScores.fetchData();
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Scores</h1>
        <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Score
        </Button>
       </div>
       <Tabs defaultValue="participants">
        <TabsList>
            <TabsTrigger value="participants">Participant Scores</TabsTrigger>
            <TabsTrigger value="teams">Team Scores</TabsTrigger>
        </TabsList>
        <TabsContent value="participants">
            <CrudPage title="" data={pScores.data} columns={pscoreColumns(pScores)} loading={pScores.loading} />
        </TabsContent>
        <TabsContent value="teams">
            <CrudPage title="" data={tScores.data} columns={tscoreColumns(tScores)} loading={tScores.loading} />
        </TabsContent>
       </Tabs>
       <ScoreForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSuccess={handleFormSuccess} />
    </div>
  );
};

export default ScoresPage;