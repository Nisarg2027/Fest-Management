// FILE: frontend/src/components/shared/FormSelect.jsx
import { useEffect } from 'react';
import { useCrud } from '@/hooks/useCrud';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

export const FormSelect = ({ endpoint, idKey, nameKey, label, value, onValueChange, placeholder, required }) => {
  const { data: options, loading, fetchData } = useCrud(endpoint, idKey, false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select onValueChange={onValueChange} value={value} required={required}>
        <SelectTrigger className="border-gray-300 bg-white hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading options...
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className="border-gray-200 bg-white shadow-lg">
          {!loading && options.map(option => (
            <SelectItem 
              key={option[idKey]} 
              value={option[idKey]}
              className="text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
            >
              <div className="flex flex-col">
                <span className="font-medium">{option[nameKey]}</span>
                <span className="text-xs text-gray-500">ID: {option[idKey]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};