'use client';

import { useState } from 'react';
import type { FilterType } from '@/types/task.types';

export const useFilter = (initialFilter: FilterType = 'all') => {
  const [filter, setFilter] = useState<FilterType>(initialFilter);

  const filterOptions = [
    { value: 'all' as const, label: 'All Tasks' },
    { value: 'pending' as const, label: 'Pending' },
    { value: 'completed' as const, label: 'Completed' },
  ];

  return {
    filter,
    setFilter,
    filterOptions,
  };
};
