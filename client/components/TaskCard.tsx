import { Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<TaskStatus, { badge: string; text: string }> = {
  pending: {
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    text: "text-amber-700",
  },
  "in-progress": {
    badge: "bg-blue-100 text-blue-800 border-blue-300",
    text: "text-blue-700",
  },
  completed: {
    badge: "bg-green-100 text-green-800 border-green-300",
    text: "text-green-700",
  },
};

const statusLabels: Record<TaskStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const colors = statusColors[task.status];
  const formattedDate = task.createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {task.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colors.badge}`}
            >
              {statusLabels[task.status]}
            </span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Select
            value={task.status}
            onValueChange={(value) =>
              onStatusChange(task.id, value as TaskStatus)
            }
          >
            <SelectTrigger className="h-9 w-32 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="h-9 w-9 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
