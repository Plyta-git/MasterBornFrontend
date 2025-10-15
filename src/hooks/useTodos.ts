import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Todo,
  addTodo as addTodoApi,
  deleteTodo as deleteTodoApi,
  getTodos,
  updateTodo as updateTodoApi,
} from "../api/todoService";

type UseTodosResult = {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodoCompletion: (id: Todo["id"]) => Promise<void>;
  clearCompleted: () => Promise<void>;
  activeCount: number;
  completedCount: number;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};

export const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(false);
  const pendingRequestsRef = useRef(0);

  const startLoading = useCallback(() => {
    pendingRequestsRef.current += 1;
    if (isMountedRef.current) {
      setIsLoading(true);
    }
  }, []);

  const stopLoading = useCallback(() => {
    pendingRequestsRef.current = Math.max(0, pendingRequestsRef.current - 1);
    if (isMountedRef.current && pendingRequestsRef.current === 0) {
      setIsLoading(false);
    }
  }, []);

  const fetchTodos = useCallback(async () => {
    startLoading();
    setError(null);
    try {
      const data = await getTodos();
      if (!isMountedRef.current) {
        return;
      }
      setTodos(data);
    } catch (err) {
      if (!isMountedRef.current) {
        return;
      }
      setError(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  const addTodo = useCallback(
    async (rawTitle: string) => {
      const title = rawTitle.trim();
      if (!title) {
        setError("Todo title cannot be empty.");
        return;
      }
      startLoading();
      setError(null);
      try {
        const newTodo = await addTodoApi(title);
        setTodos((prev) => [...prev, newTodo]);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading],
  );

  const toggleTodoCompletion = useCallback(
    async (rawId: Todo["id"]) => {
      const id = Number(rawId);
      if (Number.isNaN(id)) {
        setError(`Todo with id ${String(rawId)} was not found.`);
        return;
      }
      const currentTodo = todos.find((todo) => todo.id === id);
      if (!currentTodo) {
        setError(`Todo with id ${id} was not found.`);
        return;
      }

      const nextCompleted = !currentTodo.completed;

      startLoading();
      setError(null);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: nextCompleted } : todo,
        ),
      );

      try {
        const updatedTodo = await updateTodoApi(id, {
          completed: nextCompleted,
        });
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      } catch (err) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? currentTodo : todo)),
        );
        setError(getErrorMessage(err));
      } finally {
        stopLoading();
      }
    },
    [todos, startLoading, stopLoading],
  );

  const clearCompleted = useCallback(async () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    if (completedTodos.length === 0) {
      return;
    }

    startLoading();
    setError(null);

    try {
      await Promise.all(completedTodos.map((todo) => deleteTodoApi(todo.id)));
      setTodos((prev) => prev.filter((todo) => !todo.completed));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }, [todos, startLoading, stopLoading]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      pendingRequestsRef.current = 0;
    };
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );
  const completedCount = useMemo(
    () => todos.length - activeCount,
    [todos, activeCount],
  );

  return {
    todos,
    isLoading,
    error,
    refresh: fetchTodos,
    addTodo,
    toggleTodoCompletion,
    clearCompleted,
    activeCount,
    completedCount,
  };
};
