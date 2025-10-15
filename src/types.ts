export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoUpdate = Partial<Pick<Todo, "completed">>;
