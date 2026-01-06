interface StatusFilterProps {
  activeFilter: "all" | "pending" | "in-progress" | "completed";
  onChange: (filter: "all" | "pending" | "in-progress" | "completed") => void;
}

const filters = [
  { id: "all", label: "All Tasks" },
  { id: "pending", label: "Pending" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
] as const;

export function StatusFilter({ activeFilter, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChange(filter.id as typeof activeFilter)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            activeFilter === filter.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
