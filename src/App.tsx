import { TodoFooter } from "./components/TodoFooter";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export function App() {
  const {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodoCompletion,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  if (isLoading && todos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
      {error && (
        <div className=" bg-red-400 p-4 text-white rounded-md">{error}</div>
      )}
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodoCompletion} />
      <TodoFooter
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={clearCompleted}
      />
      {isLoading && todos.length > 0 && <div>Loading...</div>}
    </div>
  );
}
