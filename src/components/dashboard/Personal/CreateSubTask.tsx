import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePersonalTaskStore } from '@/store/usePersonalTaskStore';

interface CreateSubTaskProps {
  taskId: string;
}

export function CreateSubTask({ taskId }: CreateSubTaskProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const addSubTask = usePersonalTaskStore(state => state.addSubTask);
  const isLoading = usePersonalTaskStore(state => state.isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    try {
      await addSubTask(taskId, title.trim());
      setTitle('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to create subtask:', error);
    }
  };

  if (!isAdding) {
    return (
      <Button
        type="button"
        variant="ghost"
        className="w-full justify-start gap-2 text-muted-foreground hover:bg-slate-50"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-4 w-4" />
        Add Subtask
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-2 rounded-lg border p-3">
        <Input
          type="text"
          placeholder="Enter subtask title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-5 border-none p-0 focus-visible:ring-0"
          disabled={isLoading}
          autoFocus
        />
      </div>
      <div className="flex items-center gap-2">
        <Button 
          type="submit" 
          size="sm"
          disabled={!title.trim() || isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => {
            setIsAdding(false);
            setTitle('');
          }}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}