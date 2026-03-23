// FILE: frontend/src/components/shared/CrudPage.jsx
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CrudPage = ({
  title,
  data,
  columns,
  loading,
  handleCreate,
  FormComponent,
  isFormOpen,
  handleFormClose,
  handleFormSuccess,
  selectedItem,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage and organize your {title.toLowerCase()} records
          </p>
        </div>
        {handleCreate && (
          <Button 
            onClick={handleCreate} 
            className="bg-blue-600 hover:bg-blue-700 shadow-sm text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>

      {/* Content Card */}
      <Card className="border border-gray-200 bg-white shadow-sm px-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-gray-900">
            {title} Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 text-gray-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                Loading records...
              </div>
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </CardContent>
      </Card>
      {/* </div> */}

      {/* Form Component */}
      {FormComponent && (
        <FormComponent
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
          item={selectedItem}
        />
      )}
    </div>
  );
};