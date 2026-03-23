// FILE: frontend/src/hooks/useCrud.js
import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import { toast } from 'sonner';

export const useCrud = (endpoint, idKey, fetchOnMount = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(fetchOnMount);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (error) {
      toast.error(`Failed to fetch data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchData, fetchOnMount]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };
  
  const handleCreate = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  }

  const handleDelete = async (item) => {
    const itemId = Array.isArray(idKey) 
      ? idKey.map(key => item[key]).join('/') 
      : item[idKey];
      
    try {
      await api.delete(`${endpoint}/${itemId}`);
      toast.success('Item deleted successfully!');
      fetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to delete item.';
      toast.error(errorMessage);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedItem(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    fetchData();
  };

  return {
    data,
    setData,
    loading,
    isFormOpen,
    selectedItem,
    fetchData,
    handleEdit,
    handleCreate,
    handleDelete,
    handleFormClose,
    handleFormSuccess,
  };
};