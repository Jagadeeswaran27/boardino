import { useBoardContext } from "@/context/BoardContext";

interface FilterProps {
  filterDropdownRef: React.RefObject<HTMLDivElement | null>;
}

const Filter = ({ filterDropdownRef }: FilterProps) => {
  const { tabType, activeTab, columns, board, filter, setFilter } =
    useBoardContext();
  const users = board.members?.map((member) => member.user) || [];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (
    field: "createdDate" | "dueDate",
    type: "from" | "to",
    value: string
  ) => {
    if (!value) {
      setFilter((prev) => {
        const dateObj = prev[field];
        if (dateObj && type === "from" && !dateObj.to) {
          return { ...prev, [field]: null };
        } else if (dateObj && type === "to" && !dateObj.from) {
          return { ...prev, [field]: null };
        } else if (dateObj) {
          return {
            ...prev,
            [field]: {
              ...dateObj,
              [type]: undefined,
            },
          };
        }
        return prev;
      });
      return;
    }

    const dateValue = new Date(value);
    setFilter((prev) => {
      const existing = prev[field] || { from: undefined, to: undefined };
      return {
        ...prev,
        [field]: {
          ...existing,
          [type]: dateValue,
        },
      };
    });
  };

  const handleClearFilters = () => {
    setFilter({
      userId: "",
      columnId: "",
      createdDate: null,
      dueDate: null,
    });
  };

  const canDueDateShown =
    (tabType === "Kanban View" && activeTab !== "To Do") ||
    tabType === "Column View" ||
    tabType === "List View";
  return (
    <div
      ref={filterDropdownRef}
      className="absolute right-0 mt-2 w-72 bg-white border border-neutral-200 rounded-md shadow-lg z-10 p-4"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Filter by user
        </label>
        <select
          name="userId"
          className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
          value={filter.userId}
          onChange={handleFilterChange}
        >
          <option value="" disabled>
            Select user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
          <option value="unassigned">Unassigned</option>
        </select>
      </div>
      {tabType !== "Column View" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Filter by Column (Label)
          </label>
          <select
            name="columnId"
            className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
            value={filter.columnId}
            onChange={handleFilterChange}
          >
            <option value="" disabled>
              Select label
            </option>
            {columns.map((column) => (
              <option key={column.id} value={column.id}>
                {column.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Filter by created date
        </label>
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <label
              htmlFor="created-from-date"
              className="block text-xs text-neutral-600 mb-0.5"
            >
              From
            </label>
            <input
              type="date"
              id="created-from-date"
              className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
              value={
                filter.createdDate?.from
                  ? filter.createdDate.from.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleDateChange("createdDate", "from", e.target.value)
              }
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="created-to-date"
              className="block text-xs text-neutral-600 mb-0.5"
            >
              To
            </label>
            <input
              type="date"
              id="created-to-date"
              className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
              value={
                filter.createdDate?.to
                  ? filter.createdDate.to.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                handleDateChange("createdDate", "to", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {canDueDateShown && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Filter by due date
          </label>
          <div className="flex items-center gap-2">
            <div className="w-1/2">
              <label
                htmlFor="due-from-date"
                className="block text-xs text-neutral-600 mb-0.5"
              >
                From
              </label>
              <input
                type="date"
                id="due-from-date"
                className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
                value={
                  filter.dueDate?.from
                    ? filter.dueDate.from.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleDateChange("dueDate", "from", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="due-to-date"
                className="block text-xs text-neutral-600 mb-0.5"
              >
                To
              </label>
              <input
                type="date"
                id="due-to-date"
                className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
                value={
                  filter.dueDate?.to
                    ? filter.dueDate.to.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleDateChange("dueDate", "to", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-2 flex justify-end items-center">
        <button
          className="px-2 cursor-pointer 4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
