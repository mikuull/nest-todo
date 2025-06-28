'use client';

import { AddTaskForm } from './task/add-task-form';
import { TaskFilter } from './task/task-filter';
import { TaskList } from './task/task-list';
import { useTasks } from '@/hooks/use-tasks';
import { useFilter } from '@/hooks/use-filter';

export const HomeLayout = () => {
  const { filter, setFilter, filterOptions } = useFilter();
  const { data: rawTasks, isLoading, error } = useTasks(filter);
  const tasks = Array.isArray(rawTasks) ? rawTasks : [];

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Todo App</h1>
        <p className="text-muted-foreground">
          {totalCount > 0 && (
            <>
              {completedCount} of {totalCount} tasks completed
            </>
          )}
        </p>
      </div>

      <AddTaskForm />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        filterOptions={filterOptions}
      />

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        error={error}
        filter={filter}
      />
    </div>
  );
};
