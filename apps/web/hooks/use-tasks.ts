import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  FilterType,
} from '@/types/task.types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const useTasks = (filter: FilterType = 'all') => {
  const getCompletedParam = () => {
    if (filter === 'completed') return true;
    if (filter === 'pending') return false;
    return undefined;
  };

  return useQuery({
    queryKey: ['tasks', filter],
    queryFn: async (): Promise<Task[]> => {
      const params =
        getCompletedParam() !== undefined
          ? `?completed=${getCompletedParam()!.toString()}`
          : '';
      const res = await fetch(`${BASE_URL}/tasks${params}`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: async (): Promise<Task> => {
      const res = await fetch(`${BASE_URL}/tasks/${id}`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskDto): Promise<Task> => {
      const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateTaskDto;
    }): Promise<Task> => {
      const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update task');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
