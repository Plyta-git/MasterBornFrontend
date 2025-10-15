import { clsx } from "clsx";
import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: Todo["id"]) => Promise<void>;
};

export const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <div
      data-testid="todo-item"
      className={clsx(
        "relative flex items-start py-4",
        todo.completed && "line-through",
      )}
    >
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label
          className="select-none font-medium text-gray-900"
          data-testid="todo-title"
        >
          {todo.title} id:{todo.id}
        </label>
      </div>
      <div className="ml-3 flex h-6 items-center">
        <input
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  );
};
