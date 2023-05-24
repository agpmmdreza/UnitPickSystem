import {useEffect, useState} from "react";
import {Editor, EditorContent, useEditor} from "@tiptap/react";
import clsx from "clsx";
import classes from "./styles.module.scss";

import {generateUUIDv4} from "../../../utils/uuid";
import {StarterKit} from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import {Superscript} from "@tiptap/extension-superscript";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import {FontSize} from "tiptap-extension-font-size";
import {
    ArrowDownBold,
    BackgroundColorIcon,
    BoldIcon,
    BulletListIcon,
    FontFamilyIcon,
    FontSizeIcon,
    ImageIcon,
    IndentIcon,
    ItalicIcon,
    JustifyLeftIcon,
    LinkIcon,
    NumberedListIcon,
    OutdentIcon,
    RedoIcon,
    StrikeIcon,
    SubScriptIcon,
    SuperScriptIcon,
    TextStyleIcon,
    UnderlineIcon,
    UndoIcon,
} from "../../icon";
import {Dropdown} from "../../core/dropdown";
import DropdownItem from "../../core/dropdownItem";
import {DropdownMenu} from "../../core/dropdownMenu";
import Input from "../../core/input";

// available fonts for select inside editor
const fonts = [
  "Inter",
  "Barlow",
  "Comic Sans",
  "serif",
  "monospace",
  "cursive",
];

// TextEditor Menu's Props type interface
interface IMenuProps {
  editor: Editor | null;
  setMenuOpen?: any;
  isSubMenuOpen: boolean;
}

// text editor component props type interface
export interface ITextEditorProps {
  onContentChange?: (content: string) => any;
  shouldClearContent?: boolean;
}

// text editor component for custom text rendering & editing
const TextEditor = ({
  onContentChange,
  shouldClearContent,
}: ITextEditorProps) => {
  // Singleton editor instance, used to change style of the given text
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
      Image,
      Link.configure({
        HTMLAttributes: {
          style: "text-decoration: underline; color: blue;",
        },
      }),
      Subscript,
      Superscript,
      TextStyle,
      FontFamily,
      FontSize,
    ],
    onUpdate: ({ editor }) => {
      if (onContentChange) {
        onContentChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    shouldClearContent && editor?.commands.clearContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldClearContent]);

  // submenu open state
  const [isSubMenuOpen, setMenuOpen] = useState(false);

  // render component
  return (
    <div className={clsx(classes.textEditor)}>
      <Menubar
        editor={editor}
        setMenuOpen={setMenuOpen}
        isSubMenuOpen={isSubMenuOpen}
      />
      <SubMenu isSubMenuOpen={isSubMenuOpen} editor={editor} />
      <EditorContent
        editor={editor}
        className={clsx(classes.textEditor__editor)}
        onChange={(e) => console.log(e)}
      />
    </div>
  );
};

// top menu bar for editor actions
const Menubar = ({ editor, setMenuOpen, isSubMenuOpen }: IMenuProps) => {
  // ids for dropdowns
  const hId = "HID_" + generateUUIDv4();
  const dId1 = "DID1_" + generateUUIDv4();
  const dId2 = "DID2_" + generateUUIDv4();
  const dId3 = "DID3_" + generateUUIDv4();
  const [hColor, setHColor] = useState("#ffff0000");

  // background color changing effect
  useEffect(() => {
    if (editor?.isFocused)
      editor?.chain().focus().toggleHighlight({ color: hColor }).run();
  }, [editor, hColor]);

  // this useEffect sets paragraph mode on so we get <p></p> tag instead of <mark></mark>
  useEffect(() => {
    if (editor?.isFocused) editor?.chain().setParagraph().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  //render component
  return (
    <div className={clsx(classes.textEditor__menu)}>
      <div className={clsx(classes.textEditor__menuGroup)}>
        <div
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("bold") && classes.active,
            !editor.can().chain().focus().toggleBold().run() && classes.disable
          )}
        >
          <BoldIcon />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("italic") && classes.active,
            !editor.can().chain().focus().setItalic().run() && classes.disable
          )}
        >
          <ItalicIcon />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("underline") && classes.active
          )}
        >
          <UnderlineIcon />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("strike") && classes.active,
            !editor.can().chain().focus().toggleStrike().run() &&
              classes.disable
          )}
        >
          <StrikeIcon />
        </div>
        <div
          className={clsx(
            classes.textEditor__buttons,
            isSubMenuOpen && classes.active
          )}
          onClick={() => setMenuOpen(() => !isSubMenuOpen)}
        >
          <TextStyleIcon />
        </div>
        <div>
          <input
            type="color"
            id={hId}
            value={hColor}
            onChange={(e) => setHColor(e.target.value)}
            className={clsx(classes.textEditor__colorInput)}
          />
          <label htmlFor={hId}>
            <div
              onClick={() =>
                editor.chain().focus().toggleHighlight({ color: hColor }).run()
              }
              className={clsx(classes.textEditor__buttons)}
            >
              <BackgroundColorIcon />
            </div>
          </label>
        </div>
      </div>
      <div className={clsx(classes.textEditor__menuGroup)}>
        <Dropdown anchor="bottom">
          <div id={dId1} className={clsx(classes.textEditor__buttons)}>
            <JustifyLeftIcon />
            <ArrowDownBold className={clsx(classes.textEditor__arrow)} />
          </div>
          <DropdownMenu anchor={"top-center"} toggleId={dId1}>
            <DropdownItem
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={clsx(
                editor.isActive({ textAlign: "left" }) && classes.active
              )}
            >
              Left
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={clsx(
                editor.isActive({ textAlign: "center" }) && classes.active
              )}
            >
              Center
            </DropdownItem>
            <DropdownItem
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={clsx(
                editor.isActive({ textAlign: "right" }) && classes.active
              )}
            >
              Right
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={clsx(
                editor.isActive({ textAlign: "justify" }) && classes.active
              )}
            >
              Justify
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("orderedList") && classes.active
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <NumberedListIcon />
        </div>
        <div
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("bulletList") && classes.active
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <BulletListIcon />
        </div>
        <div
          className={clsx(
            classes.textEditor__buttons,
            editor.isActive("blockquote") && classes.disable
          )}
          onClick={() => {
            if (editor.isActive("blockquote")) return;
            editor.chain().focus().setBlockquote().run();
          }}
        >
          <IndentIcon />
        </div>
        <div
          className={clsx(
            classes.textEditor__buttons,
            !editor.isActive("blockquote") && classes.disable
          )}
          onClick={() => {
            if (!editor.isActive("blockquote")) return;
            editor.chain().focus().unsetBlockquote().run();
          }}
        >
          <OutdentIcon />
        </div>
      </div>
      <div className={clsx(classes.textEditor__menuGroup)}>
        <Dropdown anchor={"bottom"}>
          <div className={clsx(classes.textEditor__buttons)} id={dId2}>
            <ImageIcon />
          </div>
          <DropdownMenu anchor={"top-center"} toggleId={dId2}>
            <div onClick={(e) => e.stopPropagation()}>
              <h1 className={clsx(classes.textEditor__title)}>
                Enter Image Url:
              </h1>
              <Input
                type={"text"}
                className={clsx(classes.textEditor__input)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editor
                      .chain()
                      .focus()
                      .setImage({ src: e.currentTarget.value })
                      .run();
                  }
                }}
              />
            </div>
          </DropdownMenu>
        </Dropdown>

        <Dropdown anchor={"bottom"}>
          <div className={clsx(classes.textEditor__buttons)} id={dId3}>
            <LinkIcon />
          </div>
          <DropdownMenu anchor={"top-center"} toggleId={dId3}>
            <div onClick={(e) => e.stopPropagation()}>
              <h1 className={clsx(classes.textEditor__title)}>Enter Url:</h1>
              <Input
                type={"text"}
                className={clsx(classes.textEditor__input)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange("link")
                      .setLink({ href: e.currentTarget.value })
                      .run();
                  }
                }}
              />
            </div>
          </DropdownMenu>
        </Dropdown>
        <div
          className={clsx(
            classes.textEditor__buttons,
            !editor.can().chain().focus().undo().run() && classes.disable
          )}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon />
        </div>
        <div
          className={clsx(
            classes.textEditor__buttons,
            !editor.can().chain().focus().redo().run() && classes.disable
          )}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon />
        </div>
      </div>
    </div>
  );
};

// submenu component for text style
const SubMenu = ({ editor, isSubMenuOpen }: IMenuProps) => {
  const dId4 = "DID4_" + generateUUIDv4();
  const dId5 = "DID5_" + generateUUIDv4();
  if (!editor) return null;
  return (
    <div
      is-open={isSubMenuOpen ? "true" : "false"}
      className={clsx(classes.textEditor__subMenuContainer)}
    >
      <div
        className={clsx(
          classes.textEditor__subMenu,
          isSubMenuOpen && classes.menuOpen
        )}
      >
        <div
          className={clsx(
            classes.textEditor__subMenuItem,
            isSubMenuOpen && classes.menuOpen__subMenuItem,
            editor.isActive("subscript") && classes.active,
            classes.textEditor__buttons
          )}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
        >
          <SubScriptIcon />
        </div>
        <div
          className={clsx(
            classes.textEditor__subMenuItem,
            isSubMenuOpen && classes.menuOpen__subMenuItem,
            editor.isActive("superscript") && classes.active,
            classes.textEditor__buttons
          )}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
        >
          <SuperScriptIcon />
        </div>
        <Dropdown anchor={"bottom"} onClick={() => editor.chain().focus()}>
          <div
            onClick={() => editor.chain().focus()}
            id={dId4}
            className={clsx(
              classes.textEditor__subMenuItem,
              isSubMenuOpen && classes.menuOpen__subMenuItem,
              classes.textEditor__buttons
            )}
          >
            <FontFamilyIcon />
          </div>
          <DropdownMenu
            anchor={"top-center"}
            toggleId={dId4}
            className={clsx(classes.w, classes.textEditor__dropdown)}
          >
            {fonts.map((font) => {
              return (
                <div
                  onClick={() =>
                    editor.chain().focus().setFontFamily(font).run()
                  }
                  className={clsx(
                    classes.textEditor__buttons,
                    editor.isActive("textStyle", { fontFamily: "cursive" }) &&
                      classes.active
                  )}
                >
                  {font}
                </div>
              );
            })}
          </DropdownMenu>
        </Dropdown>
        <Dropdown anchor={"bottom"}>
          <div
            id={dId5}
            className={clsx(
              classes.textEditor__buttons,
              classes.textEditor__subMenuItem,
              isSubMenuOpen && classes.menuOpen__subMenuItem
            )}
          >
            <FontSizeIcon />
            <ArrowDownBold className={clsx(classes.textEditor__arrow)} />
          </div>
          <DropdownMenu
            anchor={"top-center"}
            toggleId={dId5}
            className={clsx(classes.textEditor__dropdown)}
          >
            {renderSizeItems(editor)}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

// render possible font sizes
const renderSizeItems = (editor: Editor) => {
  const items = [];

  for (let i = 6; i < 66; i += 2) {
    items.push(
      <DropdownItem
        onClick={() => {
          editor?.chain().focus().setFontSize(`${i}px`).run();
        }}
      >
        {i} px
      </DropdownItem>
    );
  }

  return items;
};

export default TextEditor;
