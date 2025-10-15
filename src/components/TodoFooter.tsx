type TodoFooterProps = {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => Promise<void>;
};

export const TodoFooter = ({
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFooterProps) => {
  const itemLabel = activeCount === 1 ? "item" : "items";

  return (
    <div className="flex h-8 items-center justify-between">
      <span
        data-testid="todo-count"
        className="text-sm font-medium leading-6 text-gray-900"
      >
        {activeCount} {itemLabel} left
      </span>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};
