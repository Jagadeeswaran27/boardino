import { useBoardContext } from "@/context/BoardContext";

interface FilterProps {
  filterDropdownRef: React.RefObject<HTMLDivElement | null>;
}
const Filter = ({ filterDropdownRef }: FilterProps) => {
  const { tabType, activeTab, columns, board } = useBoardContext();
  const users = board.members?.map((member) => member.user) || [];
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
          className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
          defaultValue=""
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
            className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
            defaultValue=""
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
      {(tabType === "Kanban View" && activeTab !== "To Do") ||
        tabType === "Column View" ||
        (tabType === "List View" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Filter by due date
            </label>
            <div className="flex items-center gap-2">
              <div className="w-1/2">
                <label
                  htmlFor="from-date"
                  className="block text-xs text-neutral-600 mb-0.5"
                >
                  From
                </label>
                <input
                  type="date"
                  id="from-date"
                  className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="to-date"
                  className="block text-xs text-neutral-600 mb-0.5"
                >
                  To
                </label>
                <input
                  type="date"
                  id="to-date"
                  className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Filter by created date
        </label>
        <div className="flex items-center gap-2">
          <div className="w-1/2">
            <label
              htmlFor="from-date"
              className="block text-xs text-neutral-600 mb-0.5"
            >
              From
            </label>
            <input
              type="date"
              id="from-date"
              className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="to-date"
              className="block text-xs text-neutral-600 mb-0.5"
            >
              To
            </label>
            <input
              type="date"
              id="to-date"
              className="w-full p-2 border border-neutral-200 rounded-md text-sm text-neutral-700 bg-white cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
