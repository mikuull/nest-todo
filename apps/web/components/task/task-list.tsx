import { TaskItem } from './task-item';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { Task, FilterType } from '@/types/task.types';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  filter: FilterType;
}

export function TaskList({ tasks, isLoading, error, filter }: TaskListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          Loading tasks...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-red-600">
            <p>Failed to load tasks</p>
            <p className="text-sm text-muted-foreground mt-1">
              {error.message}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    const emptyMessages = {
      all: 'No tasks yet. Create your first task!',
      pending: 'No pending tasks. Great job!',
      completed: 'No completed tasks yet.',
    };

    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            {emptyMessages[filter]}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
