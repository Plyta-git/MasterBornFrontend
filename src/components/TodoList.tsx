import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: Todo["id"]) => Promise<void>;
};

export const TodoList = ({ todos, onToggleTodo }: TodoListProps) => {
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">
        Todo list
      </legend>
      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} />
        ))}
      </div>
    </fieldset>
  );
};
