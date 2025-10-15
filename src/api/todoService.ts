import requestTodo from "./request";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoUpdate = Partial<Pick<Todo, "title" | "completed">>;

const TODOS_ENDPOINT = "/todos";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const getTodos = async (): Promise<Todo[]> => {
  return requestTodo<Todo[]>(TODOS_ENDPOINT);
};

export const addTodo = async (title: string): Promise<Todo> => {
  return requestTodo<Todo>(TODOS_ENDPOINT, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ title }),
  });
};

export const updateTodo = async (
  id: Todo["id"],
  updates: TodoUpdate,
): Promise<Todo> => {
  return requestTodo<Todo>(`${TODOS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(updates),
  });
};

export const deleteTodo = async (id: Todo["id"]): Promise<void> => {
  await requestTodo<void>(`${TODOS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
};
