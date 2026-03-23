// FILE: frontend/src/pages/ExpensesPage.jsx
import { useCrud } from '@/hooks/useCrud';
import { CrudPage } from '@/components/shared/CrudPage';
import { columns as expenseColumns } from './expenses/columns';
import { ExpenseForm } from './expenses/ExpenseForm'; // Assuming you create this form

const ExpensesPage = () => {
  const crud = useCrud('/expenses', 'expense_id');
  return <CrudPage title="Manage Expenses" {...crud} columns={expenseColumns(crud)} FormComponent={ExpenseForm} />;
};
export default ExpensesPage;