'use client';

import { Button } from '@/components/ui/button';
import type { FilterType } from '@/types/task.types';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filterOptions: Array<{ value: FilterType; label: string }>;
}

export function TaskFilter({
  currentFilter,
  onFilterChange,
  filterOptions,
}: TaskFilterProps) {
  return (
    <div className="flex gap-2 mb-6">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={currentFilter === option.value ? 'default' : 'outline'}
          onClick={() => onFilterChange(option.value)}
          size="sm"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
