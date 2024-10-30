import { Task } from '../types/task';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTask }) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(
    debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .filter((task) => task.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="mt-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 mb-2">
        <span className="text-2xl font-bold text-center mb-2 sm:mb-0">Today</span>

        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        <div className="flex sm:m-5 p-2 sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button
            onClick={() => setFilter('all')}
            className={`m-2 px-4 py-1 rounded-md ${
              filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`m-2 px-4 py-1 rounded-md ${
              filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('incomplete')}
            className={`m-2 px-4 py-1 rounded-md ${
              filter === 'incomplete' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          >
            Incomplete
          </button>
        </div>
      </div>

      <ul className="space-y-2 mt-6 text-lg">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center justify-between p-2 border-solid rounded-md ${
              task.completed ? 'bg-green-200' : 'bg-gray-100'
            }`}
          >
            <div className="flex border-solid items-center">
              <input
                type="radio"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="mr-2 w-4 h-4"
              />
              <span className={`${task.completed ? ' text-gray-700' : ''}`}>
                {task.text}
              </span>
            </div>

            <button onClick={() => onDeleteTask(task.id)} className="text-gray-300 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;