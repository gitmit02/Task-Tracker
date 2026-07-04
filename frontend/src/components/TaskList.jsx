import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete, onUpdate, filter }) {
  if (tasks.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-line py-16 text-center">
        <p className="text-[16px] text-ink-soft">
          {filter === "all"
            ? "No tasks yet. Add your first one above."
            : filter === "active"
            ? "Nothing active — everything's done."
            : "No completed tasks yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
