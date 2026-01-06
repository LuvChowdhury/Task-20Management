import { useState, useEffect } from "react";
import { CheckCircle2, ListTodo } from "lucide-react";
import { TaskCard, Task, TaskStatus } from "@/components/TaskCard";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { StatusFilter } from "@/components/StatusFilter";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      return JSON.parse(saved).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    }
    return [
      {
        id: "1",
        title: "Design mobile app wireframes",
        description: "Create low-fidelity wireframes for the mobile version",
        status: "in-progress" as TaskStatus,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        title: "Review project requirements",
        description:
          "Review and finalize project specifications with stakeholders",
        status: "completed" as TaskStatus,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        title: "Set up development environment",
        description: "Configure Node.js, npm, and necessary development tools",
        status: "pending" as TaskStatus,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];
  });

  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "in-progress" | "completed"
  >("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    return task.status === filterStatus;
  });

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
      createdAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <ListTodo className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Task Manager
              </h1>
              <p className="text-sm text-gray-600">
                Organize and track your work effortlessly
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {stats.total}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Total Tasks</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-amber-700">
              {stats.pending}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Pending</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-blue-700">
              {stats.inProgress}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">In Progress</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="text-2xl sm:text-3xl font-bold text-green-700">
              {stats.completed}
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">Completed</p>
          </div>
        </div>

        {/* Create Task Form */}
        <div className="mb-8">
          <CreateTaskForm onSubmit={handleAddTask} />
        </div>

        {/* Filter and Task List */}
        <div className="space-y-6">
          <StatusFilter
            activeFilter={filterStatus}
            onChange={setFilterStatus}
          />

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {filterStatus === "completed"
                    ? "No completed tasks yet"
                    : filterStatus === "pending"
                      ? "No pending tasks"
                      : filterStatus === "in-progress"
                        ? "No tasks in progress"
                        : "No tasks yet"}
                </h3>
                <p className="text-gray-600">
                  {filterStatus === "all"
                    ? "Create your first task to get started"
                    : "Try adjusting your filters"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
