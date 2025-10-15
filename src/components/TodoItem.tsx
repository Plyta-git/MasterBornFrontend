import { clsx } from "clsx";

export const TodoItem = () => {
  return (
    <div
      data-testid="todo-item"
      className={clsx(
        "relative flex items-start py-4",
        // todo.completed && "line-through",
      )}
    >
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label
          className="select-none font-medium text-gray-900"
          data-testid="todo-title"
        >
          Title
        </label>
      </div>
      <div className="ml-3 flex h-6 items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  );
};
