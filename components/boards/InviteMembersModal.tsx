"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { motion } from "framer-motion";
import md5 from "md5";
import { Role } from "@prisma/client";
import { toast } from "react-toastify";

import { sendInviteEmail } from "@/lib/services/boards";
import { useBoardContext } from "@/context/BoardContext";

interface InviteMembersModalProps {
  setIsInviteModalOpen: (isOpen: boolean) => void;
}

const getGravatarUrl = (email: string) => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};
type EmailWithAvatar = {
  email: string;
  avatarUrl: string;
};
const InviteMembersModal = ({
  setIsInviteModalOpen,
}: InviteMembersModalProps) => {
  const [emails, setEmails] = useState<EmailWithAvatar[]>([]);
  const [role, setRole] = useState<Role>("VIEWER");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { board } = useBoardContext();
  if (!id) return null;

  const handleOnInvite = async () => {
    if (emails.length === 0) {
      return;
    }
    setLoading(true);
    const response = await sendInviteEmail(
      emails.map((item) => item.email),
      board.id,
      board.name,
      message,
      board.owner?.name || "Board Owner",
      role
    );
    if (response) {
      setEmails([]);
      setMessage("");
      setRole("VIEWER");
      setIsInviteModalOpen(false);
      toast.success("Invitation sent successfully!");
    } else {
      toast.error("Failed to send invitation. Please try again.");
    }
    setLoading(false);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const email = event.currentTarget.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return;
      }
      inputRef.current!.value = "";
      const avatarUrl = getGravatarUrl(email);
      setEmails((prev) => {
        if (prev.some((item) => item.email === email)) {
          return prev;
        }
        return [...prev, { email, avatarUrl }];
      });
    }
  };
  const handleRemoveEmail = (email: string) => {
    setEmails((prev) => prev.filter((item) => item.email !== email));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-xl font-semibold text-neutral-900">
            Invite Members
          </h2>
          <p className="text-neutral-600 text-sm">
            Add members to collaborate on this board
          </p>
        </div>

        <div className="p-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address (Shift + Enter to add)
            </label>
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              type="email"
              placeholder="Enter email address"
              className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Added Email
            </label>
            {emails.length > 0 ? (
              <div className="flex items flex-wrap gap-2">
                {emails.map((emailWithAvatar) => (
                  <div
                    key={emailWithAvatar.email}
                    className="flex items-center justify-center bg-neutral-100 rounded-md px-2 py-1"
                  >
                    <Image
                      src={emailWithAvatar.avatarUrl}
                      alt={emailWithAvatar.email}
                      className="w-6 h-6 rounded-full mr-2"
                      width={24}
                      height={24}
                    />
                    <span className="text-sm text-neutral-800">
                      {emailWithAvatar.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(emailWithAvatar.email)}
                      className="ml-2 text-neutral-400 hover:text-primary focus:outline-none"
                      aria-label={`Remove ${emailWithAvatar.email}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-600">No emails added yet.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Role
            </label>
            <select
              className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              {Object.values(Role).map((roleValue) => (
                <option key={roleValue} value={roleValue}>
                  {roleValue}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Message (optional)
            </label>
            <textarea
              placeholder="Add a message to your invitation"
              rows={3}
              className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="p-5 bg-neutral-50 flex justify-end gap-3 rounded-b-lg">
          <button
            onClick={() => setIsInviteModalOpen(false)}
            className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleOnInvite}
            className="btn-primary"
          >
            {loading ? "Sending..." : "Send Invitation"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InviteMembersModal;
