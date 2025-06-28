export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
}

export interface UpdateTaskDto {
  title?: string;
  completed?: boolean;
}

export type FilterType = 'all' | 'completed' | 'pending';
