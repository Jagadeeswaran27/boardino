"use client";

import React, { useState } from "react";

import { TbLayoutKanban } from "react-icons/tb";
import { IoCloseOutline, IoGridOutline, IoListOutline } from "react-icons/io5";

import { useBoardContext } from "@/context/BoardContext";
import { TAB_TYPE } from "@/lib/utils/board";

const ViewDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { tabType, updateTabType } = useBoardContext();
  const [selectedTab, setSelectedTab] = useState<TAB_TYPE>(tabType);

  const viewOptions: {
    type: TAB_TYPE;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      type: "Column View",
      label: "Column View",
      icon: <IoGridOutline size={20} />,
      description: "View tasks organized in columns for easy tracking",
    },
    {
      type: "Kanban View",
      label: "Kanban View",
      icon: <TbLayoutKanban size={20} />,
      description: "Drag and drop tasks between status columns",
    },
    {
      type: "List View",
      label: "List View",
      icon: <IoListOutline size={20} />,
      description: "View tasks in a compact list format",
    },
  ];

  const handleApplyChanges = () => {
    updateTabType(selectedTab);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full bg-white z-50 w-80 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex justify-between items-center p-4 border-b border-neutral-200">
            <h3 className="font-medium text-lg text-neutral-900">
              View Settings
            </h3>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 cursor-pointer"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {/* Drawer content */}
          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-sm font-medium text-neutral-500 mb-3 uppercase">
              View Type
            </h4>
            <div className="space-y-2">
              {viewOptions.map((option) => (
                <button
                  key={option.type}
                  onClick={() => {
                    setSelectedTab(option.type);
                  }}
                  className={`w-full flex items-start p-3 rounded-lg transition-colors text-left ${
                    selectedTab === option.type
                      ? "bg-primary text-white"
                      : "hover:bg-neutral-50 text-neutral-800 cursor-pointer"
                  }`}
                >
                  <div className="mr-3 mt-0.5">{option.icon}</div>
                  <div>
                    <div
                      className={`font-medium ${selectedTab === option.type ? "text-white" : "text-neutral-800"}`}
                    >
                      {option.label}
                    </div>
                    <div
                      className={`text-sm ${selectedTab === option.type ? "text-white/80" : "text-neutral-500"}`}
                    >
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Drawer footer */}
          <div className="p-4 border-t border-neutral-200">
            <button
              onClick={handleApplyChanges}
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewDrawer;
