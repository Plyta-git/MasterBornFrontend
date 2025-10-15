import { TodoFooter } from "./components/TodoFooter";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = `http://localhost:3000`;

export function App() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
      <TodoForm />
      <TodoList />
      <TodoFooter />
    </div>
  );
}
