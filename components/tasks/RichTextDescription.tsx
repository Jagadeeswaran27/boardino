import {
  FaBold,
  FaItalic,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaLink,
  FaUnlink,
} from "react-icons/fa";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { toast } from "react-toastify";

const RichTextDescription = ({ editor }: { editor: Editor | null }) => {
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isTextSelected, setIsTextSelected] = useState(false);

  if (!editor) {
    return null;
  }

  const showLinkInput = () => {
    // Check if text is selected
    const isEmpty = editor.state.selection.empty;
    setIsTextSelected(!isEmpty);

    // If there's already a link, get its URL
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);

    // If no text is selected, prepare to ask for link text
    if (isEmpty) {
      setLinkText("");
    } else {
      // Get the selected text
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, " ");
      setLinkText(selectedText);
    }

    setIsLinkInputVisible(true);
  };

  const applyLink = () => {
    // Format URL properly
    let formattedUrl = linkUrl;
    if (linkUrl && !/^https?:\/\//i.test(linkUrl)) {
      formattedUrl = "https://" + linkUrl;
    }

    try {
      if (!linkUrl.trim()) {
        // If URL is empty, remove the link
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
      } else if (isTextSelected) {
        // Text is selected, transform it to a link
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: formattedUrl })
          .run();
      } else {
        // No text selected, insert a new link with the URL as text
        const textToInsert = linkText || linkUrl;
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${formattedUrl}">${textToInsert}</a>`)
          .run();
      }
    } catch (error) {
      console.error("Error setting link:", error);
      toast.error("Failed to set link. Please try again.");
    }

    // Reset and hide the link input
    setIsLinkInputVisible(false);
    setLinkUrl("");
    setLinkText("");
  };

  const cancelLink = () => {
    setIsLinkInputVisible(false);
    setLinkUrl("");
    setLinkText("");
  };

  return (
    <div className="flex flex-col border border-neutral-300 border-b-0 rounded-t-md bg-neutral-50">
      <div className="flex items-center space-x-1 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-1 rounded ${editor.isActive("bold") ? "bg-neutral-300" : "hover:bg-neutral-200"}`}
          aria-label="Bold"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${editor.isActive("italic") ? "bg-neutral-300" : "hover:bg-neutral-200"}`}
          aria-label="Italic"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-1 rounded ${editor.isActive("strike") ? "bg-neutral-300" : "hover:bg-neutral-200"}`}
          aria-label="Strikethrough"
        >
          <FaStrikethrough />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded ${editor.isActive("bulletList") ? "bg-neutral-300" : "hover:bg-neutral-200"}`}
          aria-label="Bullet List"
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded ${editor.isActive("orderedList") ? "bg-neutral-300" : "hover:bg-neutral-200"}`}
          aria-label="Ordered List"
        >
          <FaListOl />
        </button>
        {/* Link buttons */}
        <button
          type="button"
          onClick={showLinkInput}
          className={`p-1 rounded ${editor.isActive("link") ? "bg-neutral-300" : "hover:bg-neutral-200"}`}
          aria-label="Set Link"
        >
          <FaLink />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className={`p-1 rounded hover:bg-neutral-200 ${!editor.isActive("link") ? "opacity-50" : ""}`}
          aria-label="Remove Link"
        >
          <FaUnlink />
        </button>
      </div>

      {/* Inline link input form */}
      {isLinkInputVisible && (
        <div className="p-2 border-t border-neutral-200 bg-neutral-100 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="linkUrl" className="text-xs text-neutral-600">
              URL
            </label>
            <input
              type="text"
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="px-2 py-1 border border-neutral-300 rounded text-sm"
              autoFocus
            />
          </div>

          {!isTextSelected && (
            <div className="flex flex-col gap-1">
              <label htmlFor="linkText" className="text-xs text-neutral-600">
                Link Text
              </label>
              <input
                type="text"
                id="linkText"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Link text"
                className="px-2 py-1 border border-neutral-300 rounded text-sm"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={cancelLink}
              className="px-2 py-1 text-xs bg-neutral-200 hover:bg-neutral-300 rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={applyLink}
              className="px-2 py-1 text-xs bg-blue-500 text-white hover:bg-blue-600 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextDescription;
