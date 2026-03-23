// FILE: frontend/src/components/shared/ActionsCell.jsx
import { MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from 'react';

export const ActionsCell = ({ row, handleEdit, handleDelete, deleteWarning }) => {
  const item = row.original;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 border border-gray-200 bg-white shadow-lg"
        >
          {handleEdit && (
            <DropdownMenuItem 
              onClick={() => handleEdit(item)}
              className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 text-gray-600" />
              Edit
            </DropdownMenuItem>
          )}
          {handleDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setDeleteDialogOpen(true)}
                className="flex items-center gap-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border border-gray-200 bg-white shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {deleteWarning || 'This action cannot be undone. This will permanently delete the record and remove all associated data.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                handleDelete(item);
                setDeleteDialogOpen(false);
              }}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};