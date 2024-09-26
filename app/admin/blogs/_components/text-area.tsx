import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Heading3 } from 'lucide-react'; // Icons for buttons
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TextAreaProps {
    currentContent: string;
    setCurrentContent: (content: string) => void;
}

const DescriptionArea = ({ currentContent, setCurrentContent }: TextAreaProps) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: currentContent,
        onUpdate: ({ editor }) => {
            setCurrentContent(editor.getHTML()); // Sync editor content to state
        },
        editorProps: {
            attributes: {
                class: 'text-sm bg-[#191919] rounded-md p-2.5 focus:outline-none h-[600px]',
            }
        }
    });

    // Sync changes from external content source (Textarea) to the editor
    useEffect(() => {
        if (editor && editor.getHTML() !== currentContent) {
            editor.commands.setContent(currentContent); // Update editor content if currentContent changes
        }
    }, [currentContent, editor]);

    if (!editor) {
        return null; // Prevent rendering until editor is ready
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
            </div>



            {/* Tiptap Editor */}
            <div className="text-sm rounded-md mb-4 h-full">
                <EditorContent
                    editor={editor}
                    placeholder='Beschreibung eingeben...'
                />
            </div>




        </div>
    );
};

export default DescriptionArea;
