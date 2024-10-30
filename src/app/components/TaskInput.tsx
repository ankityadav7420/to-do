import { useState } from 'react';

interface TaskInputProps {
  onAddTask: (taskText: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-4 w-full">
      <input
        type="text"
        placeholder="Type something..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="p-2 rounded-md border border-gray-300 w-full"
      />
      <button onClick={handleAddTask} className="px-4 py-2 bg-black text-white rounded-md w-full">
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;