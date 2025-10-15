import { FormEvent, useState } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => Promise<void>;
};

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      await onAddTodo(title);
      return;
    }

    await onAddTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        type="text"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </form>
  );
};
