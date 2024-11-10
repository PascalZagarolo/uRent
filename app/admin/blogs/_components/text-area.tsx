'use client'

import { useEditor, EditorContent, FloatingMenu, BubbleMenu, mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useEffect } from 'react';
import { Bold, Italic,  Strikethrough, Code,  Heading1, Heading2, Heading3, UnderlineIcon, LinkIcon } from 'lucide-react'; // Icons for buttons
import { Label } from '@/components/ui/label';
import Paragraph from '@tiptap/extension-paragraph'
import { cn } from '@/lib/utils';
import Heading from "@tiptap/extension-heading"
import Underline from '@tiptap/extension-underline'
import { PiListBullets } from 'react-icons/pi';
import BulletList from '@tiptap/extension-bullet-list';
import Link from '@tiptap/extension-link';
import HardBreak from '@tiptap/extension-hard-break';
import {Slice, Fragment, Node} from 'prosemirror-model'

interface TextAreaProps {
    currentContent: string;
    setCurrentContent: (content: string) => void;
}

const DescriptionArea = ({ currentContent, setCurrentContent }: TextAreaProps) => {
    const editor = useEditor({
        extensions: [
        StarterKit,
        Paragraph.extend({
			parseHTML() {
				return [{ tag: 'div' }]
			},
			renderHTML({ HTMLAttributes }) {
				return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
			},
		}),
        HardBreak.extend({
            addKeyboardShortcuts() {
                return {
                    Enter: () => {
                        
                        if (this.editor.isActive('orderedList') || this.editor.isActive('bulletList')) {
                            console.log("..")
                            return this.editor.chain().createParagraphNear().run();
                        }
                        return this.editor.commands.setHardBreak();
                    },
                };
            },
        }),
        Heading.extend({
            levels: [1, 2, 3],
            renderHTML({ node, HTMLAttributes }) {
              const level = this.options.levels.includes(node.attrs.level)
                ? node.attrs.level
                : this.options.levels[0];
              const classes: { [index: number]: string } = {
                1: 'text-2xl font-bold',
                2: 'text-xl font-semibold',
                3 : 'text-lg font-semibold'
              };
              return [
                `h${level}`,
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                  class: `${classes[level]}`,
                }),
                0,
              ];
            },
          }).configure({ levels: [1, 2, 3] }),
          Underline.configure({
            HTMLAttributes: {
              class: 'underline',
            },
          }),
          BulletList.configure({
            HTMLAttributes: {
              class: 'list-disc pl-4',
            },
          }),
          Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: 'https',
          }),
        Paragraph.configure({
            HTMLAttributes: {
              class: 'my-custom-class',
            },
          })
        
        ],
        content: currentContent,
        onUpdate: ({ editor }) => {
            let content = editor.getHTML();
          
            setCurrentContent(content);
        },
        editorProps: {
            attributes: {
                class: 'min-h-[200px] bg-[#191919] rounded-md p-2.5 focus:outline-none',
            },
            clipboardTextParser: clipboardTextParser,
        }
    });

    

    


    function clipboardTextParser(text, context, plain) {
        const blocks = text.split(/(?:\r\n?|\n)/); // Splits text on new lines
        const nodes = [];
    
        blocks.forEach(line => {
            if (line.length > 0) {
                nodes.push(
                    Node.fromJSON(context.doc.type.schema, {
                        type: "paragraph",
                        content: [{ type: "text", text: line }],
                    })
                );
            } else {
                // Handle empty lines with a hard break
                nodes.push(
                    Node.fromJSON(context.doc.type.schema, {
                        type: "hardBreak",
                    })
                );
            }
        });
    
        const fragment = Fragment.fromArray(nodes);
        return Slice.maxOpen(fragment);
    }

    // Sync changes from external content source (Textarea) to the editor
    useEffect(() => {
        if (editor && editor.getHTML() !== currentContent) {
            editor.commands.setContent(currentContent);// Update editor content if currentContent changes
        }
    }, [currentContent, editor]);

    if (!editor) {
        return null; // Prevent rendering until editor is ready

    }

    const setLink = () => {
       if(!editor.isActive('link')) {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
    
        // cancelled
        if (url === null) {
          return
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()
    
          return
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
          .run()
       } else {
        editor.chain().focus().unsetLink().run()
       }
      }

    
    return (
        <div>
            <Label className='text-sm mb-2'>
                Inhalt
            </Label>

            {/* Toolbar */}
            <div className='flex items-center space-x-2 mb-4 bg-[#191919] shadow-lg p-2 rounded-md'>
                {/* Bold */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('bold') ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Bold size={20} />
                </button>

                {/* Italic */}
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('italic') ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Italic size={20} />
                </button>

                {/* Italic */}
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('underline') ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <UnderlineIcon size={20} />
                </button>

                {/* Strikethrough */}
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('strike') ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Strikethrough size={20} />
                </button>

                {/* Code */}
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('code') ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Code size={20} />
                </button>

                {/* Heading 1 */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('heading', { level: 1 }) ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Heading1 size={20} />
                </button>

                {/* Heading 2 */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('heading', { level: 2 }) ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Heading2 size={20} />
                </button>

                {/* Heading 3 */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('heading', { level: 3 }) ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <Heading3 size={20} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    disabled={!editor.can().chain().focus().toggleBulletList().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('bulletList', { level: 3 }) ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <PiListBullets size={20} />
                </button>

                <button
                    onClick={setLink}
                    disabled={!editor.can().chain().focus().toggleBulletList().run()}
                    className={cn("p-2.5 hover:bg-slate-800 rounded-md", `btn ${editor.isActive('bulletList', { level: 3 }) ? 'bg-[#202020] text-white' : ''}`)}
                >
                    <LinkIcon size={20} />
                </button>
            </div>



            
            <div className="text-sm rounded-md mb-4 h-full" >
                <EditorContent
                    value={currentContent}
                    editor={editor}
                    
                />
            </div>




        </div>
    );
};

export default DescriptionArea;
