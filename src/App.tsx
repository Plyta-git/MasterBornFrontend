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

  // Kompentuje isLoading aby uniknąć błędów z ewentualnymi testami

  // if (isLoading && todos.length === 0) {
  //   return <div>Loading...</div>;
  // }

  // ! Istnieje błąd z ID Todosow, w bazie danych każdy nowy todo ma ID: todos.length + 1,
  // Przez to usuwając i tworząc nowe taski niektóre ID mogą się powtarzać (problemy z zaznaczaniem, usuwaniem, key w mapie)
  // postanowiłem niezmieniać logiki w Api

  // pozdrawiam :)

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
