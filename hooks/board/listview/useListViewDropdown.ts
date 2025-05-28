import { useState, useRef, useEffect, useCallback } from "react";

export function useListViewDropdown() {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showLabelDropdown, setShowLabelDropdown] = useState<string | null>(
    null
  );
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState<
    string | null
  >(null);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  const filterDropdownRef = useRef<HTMLDivElement | null>(null);
  const labelDropdownRef = useRef<HTMLDivElement | null>(null);
  const assigneeDropdownRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLTableCellElement>(null);
  const assigneeRef = useRef<HTMLTableCellElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const calculateDropdownPosition = useCallback(
    (element: HTMLElement | null) => {
      if (!element || !tableContainerRef.current) return "bottom";

      const rect = element.getBoundingClientRect();
      const containerRect = tableContainerRef.current.getBoundingClientRect();
      const spaceBelow = containerRect.bottom - rect.bottom;
      const dropdownHeight = 200;

      return spaceBelow < dropdownHeight ? "top" : "bottom";
    },
    []
  );

  const handleLabelClick = useCallback(
    (taskId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setShowAssigneeDropdown(null);
      const position = calculateDropdownPosition(
        event.currentTarget as HTMLElement
      );
      setDropdownPosition(position);
      setShowLabelDropdown((prev) => (prev === taskId ? null : taskId));
    },
    [calculateDropdownPosition]
  );

  const handleAssigneeClick = useCallback(
    (taskId: string, event: React.MouseEvent) => {
      event.stopPropagation();
      setShowLabelDropdown(null);
      const position = calculateDropdownPosition(
        event.currentTarget as HTMLElement
      );
      setDropdownPosition(position);
      setShowAssigneeDropdown((prev) => (prev === taskId ? null : taskId));
    },
    [calculateDropdownPosition]
  );

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilterDropdown &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }

      if (
        showLabelDropdown &&
        labelDropdownRef.current &&
        !labelDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLabelDropdown(null);
      }

      if (
        showAssigneeDropdown &&
        assigneeDropdownRef.current &&
        !assigneeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAssigneeDropdown(null);
      }
    };

    if (showFilterDropdown || showLabelDropdown || showAssigneeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilterDropdown, showLabelDropdown, showAssigneeDropdown]);

  return {
    showFilterDropdown,
    showLabelDropdown,
    showAssigneeDropdown,
    dropdownPosition,
    filterDropdownRef,
    labelDropdownRef,
    assigneeDropdownRef,
    labelRef,
    assigneeRef,
    filterButtonRef,
    tableContainerRef,
    setShowFilterDropdown,
    handleLabelClick,
    handleAssigneeClick,
  };
}
