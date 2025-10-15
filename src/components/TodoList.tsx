import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">
        Todo list
      </legend>
      <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        <TodoItem />
      </div>
    </fieldset>
  );
};
