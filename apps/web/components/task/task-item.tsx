'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUpdateTask, useDeleteTask } from '@/hooks/use-tasks';
import { Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';
import type { Task } from '@/types/task.types';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleToggleComplete = async () => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        data: { completed: !task.completed },
      });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        data: {
          title: editTitle.trim(),
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTaskMutation.mutateAsync(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  return (
    <Card
      className={`transition-opacity ${task.completed ? 'opacity-75' : ''}`}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            disabled={updateTaskMutation.isPending}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Task title"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    disabled={!editTitle.trim() || updateTaskMutation.isPending}
                  >
                    {updateTaskMutation.isPending && (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    )}
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3
                  className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {task.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                disabled={
                  updateTaskMutation.isPending || deleteTaskMutation.isPending
                }
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDelete}
                disabled={
                  updateTaskMutation.isPending || deleteTaskMutation.isPending
                }
              >
                {deleteTaskMutation.isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
