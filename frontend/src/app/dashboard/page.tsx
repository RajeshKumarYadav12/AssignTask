'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import apiClient from '@/lib/api';
import { Task, TaskStats, TaskFormData } from '@/types';
import { 
  LogOut, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Trash2,
  Edit,
  BarChart,
  X,
  Calendar,
  Flag,
  FileText,
  User,
  TrendingUp,
  ListChecks
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function DashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>();

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filterStatus, filterPriority]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let url = '/tasks?limit=50';
      if (filterStatus !== 'all') url += `&status=${filterStatus}`;
      if (filterPriority !== 'all') url += `&priority=${filterPriority}`;
      
      const response: any = await apiClient.get(url);
      const tasksData = response.data || [];
      setTasks(tasksData);
      
      // Calculate stats from tasks if no filters applied
      if (filterStatus === 'all' && filterPriority === 'all') {
        calculateStatsFromTasks(tasksData);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const calculateStatsFromTasks = (tasksData: Task[]) => {
    const stats = {
      total: tasksData.length,
      pending: tasksData.filter(t => t.status === 'pending').length,
      inProgress: tasksData.filter(t => t.status === 'in-progress').length,
      completed: tasksData.filter(t => t.status === 'completed').length,
      high: tasksData.filter(t => t.priority === 'high').length,
      medium: tasksData.filter(t => t.priority === 'medium').length,
      low: tasksData.filter(t => t.priority === 'low').length,
    };
    setStats(stats);
  };

  const fetchStats = async () => {
    try {
      const response: any = await apiClient.get('/tasks/stats');
      console.log('Stats response:', response); // Debug log
      console.log('Stats data:', response.data); // Debug log
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // Set default stats if fetch fails
      setStats({
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        high: 0,
        medium: 0,
        low: 0
      });
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    reset({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setValue('title', task.title);
    setValue('description', task.description);
    setValue('status', task.status);
    setValue('priority', task.priority);
    setValue('dueDate', task.dueDate ? task.dueDate.split('T')[0] : '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    reset();
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      // Remove empty dueDate if not provided
      const taskData = { ...data };
      if (!taskData.dueDate || taskData.dueDate === '') {
        delete taskData.dueDate;
      }

      if (editingTask) {
        // Update existing task
        await apiClient.put(`/tasks/${editingTask._id}`, taskData);
        toast.success('Task updated successfully!');
      } else {
        // Create new task
        await apiClient.post('/tasks', taskData);
        toast.success('Task created successfully!');
      }
      closeModal();
      fetchTasks();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save task');
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await apiClient.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully');
      fetchTasks();
      fetchStats();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete task');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border border-amber-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border border-orange-200';
      default: return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center">
                  Task Dashboard
                  {isAdmin && (
                    <span className="ml-3 px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-300">
                      ADMIN
                    </span>
                  )}
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Welcome back, <span className="font-semibold text-gray-900">{user?.name}</span> 👋
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition border border-gray-200 hover:border-red-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Tasks Card */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-bl-full opacity-50"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Total Tasks</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.total || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">All your tasks</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                    <BarChart className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
            </div>

            {/* Pending Card */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-bl-full opacity-50"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Pending</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.pending || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">Awaiting start</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            </div>

            {/* In Progress Card */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-bl-full opacity-50"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">In Progress</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.inProgress || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">Active tasks</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                    <AlertCircle className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            </div>

            {/* Completed Card */}
            <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-bl-full opacity-50"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Completed</p>
                    <p className="text-4xl font-bold text-gray-900">{stats.completed || 0}</p>
                    <p className="text-xs text-gray-500 mt-2">Finished tasks</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
            </div>
          </div>
        )}

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg mr-3">
                  <ListChecks className="h-5 w-5 text-white" />
                </div>
                Your Tasks
              </h2>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900 hover:border-blue-400 transition cursor-pointer shadow-sm hover:shadow"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white text-gray-900 hover:border-blue-400 transition cursor-pointer shadow-sm hover:shadow"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <button
                  onClick={openCreateModal}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Task</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="p-4 space-y-4">
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No tasks found</p>
                <p className="text-gray-400 text-sm mb-4">Create your first task to get started!</p>
                <button
                  onClick={openCreateModal}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Task</span>
                </button>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group border-l-4 border-transparent hover:border-blue-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-3">
                        <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm flex items-center ${getPriorityColor(task.priority)}`}>
                          <Flag className="h-3 w-3 mr-1" />
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{task.description}</p>
                      <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                        {task.dueDate && (
                          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(task)}
                        className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all transform hover:scale-110"
                        title="Edit task"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all transform hover:scale-110"
                        title="Delete task"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700 mt-12">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-lg">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Task Dashboard</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                A modern task management platform designed to help you organize, track, and complete your tasks efficiently.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Features</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex items-center hover:text-blue-400 transition cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  Task Management
                </li>
                <li className="flex items-center hover:text-blue-400 transition cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  Real-time Statistics
                </li>
                <li className="flex items-center hover:text-blue-400 transition cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  Priority & Status Filters
                </li>
                <li className="flex items-center hover:text-blue-400 transition cursor-pointer">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                  Secure Authentication
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Your Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer">
                  <span className="text-sm text-gray-300">Total Tasks</span>
                  <span className="text-sm font-bold text-white">{stats?.total || 0}</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer">
                  <span className="text-sm text-gray-300">Completed</span>
                  <span className="text-sm font-bold text-emerald-400">{stats?.completed || 0}</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer">
                  <span className="text-sm text-gray-300">In Progress</span>
                  <span className="text-sm font-bold text-blue-400">{stats?.inProgress || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Task Dashboard. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="flex items-center">
                  Built with <span className="text-red-500 mx-1.5 animate-pulse">♥</span> using Next.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-center rounded-t-2xl relative">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition absolute right-4"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title', {
                    required: 'Title is required',
                    minLength: { value: 3, message: 'Title must be at least 3 characters' },
                  })}
                  className={`block w-full px-4 py-3 border ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-gray-900 placeholder:text-gray-400`}
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  className={`block w-full px-4 py-3 border ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-gray-900 placeholder:text-gray-400`}
                  placeholder="Describe your task"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    {...register('status')}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-gray-900"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    {...register('priority')}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-gray-900"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date (Optional)
                </label>
                <input
                  id="dueDate"
                  type="date"
                  {...register('dueDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white text-gray-900"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition shadow-lg hover:shadow-xl flex items-center space-x-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>{editingTask ? 'Update Task' : 'Create Task'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
