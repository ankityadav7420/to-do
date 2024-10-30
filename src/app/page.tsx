"use client"
import { useState, useEffect } from 'react';
import { Task } from './types/task';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { v4 as uuidv4 } from 'uuid';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText: string) => {
    setTasks([...tasks, { id: uuidv4(), text: taskText, completed: false }]);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

 return (
  <div className="w-full max-w-[90%] mx-auto p-4 mt-6 sm:max-w-[80%]">
    <TaskList tasks={tasks} onToggleTask={toggleTaskCompletion} onDeleteTask={deleteTask} />
    <TaskInput onAddTask={addTask} />
  </div>
  );
};

export default Home;