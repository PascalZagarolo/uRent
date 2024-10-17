'use client'

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadImage from "../upload-image";
import { block } from "@/db/schema";
import LetterRestriction from "@/components/letter-restriction";

interface ChatInputProps {
    otherUser: string;
    otherUserName: string;
    existingBlock: typeof block.$inferSelect[];
}

const MAX_LINES = 50;
const MAX_PARAGRAPHS = 5;

const ChatInput: React.FC<ChatInputProps> = ({
    otherUser,
    otherUserName,
    existingBlock
}) => {

    const [currentValue, setCurrentValue] = useState("");
    const conversationId = useSearchParams().get("conversationId");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const formSchema = z.object({
        content: z.string().optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    // Helper to count lines and paragraphs
    const countNewlines = (text: string) => (text.match(/\n/g) || []).length;
    const countParagraphs = (text: string) => text.split(/\n{2,}/).length;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const newText = currentValue + e.key;
        const newLines = countNewlines(newText);
        const paragraphs = countParagraphs(newText);

        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Shift + Enter creates a new line
                if (newLines >= MAX_LINES) {
                    e.preventDefault();  // Prevent adding more than the max lines
                }
            } else if(!isLoading) {
                e.preventDefault();
                // Only allow to submit if Enter is pressed without Shift, and if line limit isn't exceeded
                form.handleSubmit(onSubmit)();
            }

            // Limit paragraphs by restricting consecutive newlines
            if (paragraphs >= MAX_PARAGRAPHS) {
                e.preventDefault();  // Prevent adding more paragraphs
            }
        }
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";  // Reset height to auto
            const scrollHeight = textarea.scrollHeight;  // Get the scroll height
            const lineHeight = 24;  // Approximate line height (adjust if needed)
            const maxRows = 50;  // Max number of rows
            const maxHeight = lineHeight * maxRows;  // Maximum height for 50 rows

            if (scrollHeight <= maxHeight) {
                textarea.style.height = `${scrollHeight}px`;  // Grow until maxHeight
            } else {
                textarea.style.height = `${maxHeight}px`;  // Stop growing beyond maxHeight
                textarea.style.overflowY = 'auto';  // Enable scroll if exceeding maxHeight
            }
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [currentValue]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const values = {
                content: currentValue,
                otherUser: otherUser,
                otherUserName: otherUserName
            }

            setIsLoading(true);
            await axios.post(`/api/message/${conversationId}`, values);
            setCurrentValue("");

        } catch (error) {
            console.log("Fehler beim Kommentar absenden");
        } finally {
            setIsLoading(false);
            form.reset();
        }
    };

    return (
        <div className="bottom-0 flex justify-center sm:bg-white items-center w-full dark:bg-[#080808]">
            <div className="w-full flex p-4">

                {existingBlock?.length === 0 && (
                    <UploadImage
                        otherUser={otherUser}
                        otherUserName={otherUserName}
                    />
                )}

                <div className="flex flex-grow flex-col">
                    {/* Dynamic textarea with restrictions */}
                    <textarea
                        ref={textareaRef}
                        className="resize-none h-auto max-h-[50rem] mt-auto border text-black w-full text-sm
                        dark:bg-[#0F0F0F] dark:text-gray-200 focus-visible:ring-0 focus-visible:border-none focus:outline-none dark:border-none px-3 py-2 rounded-md"
                        rows={1}
                        maxLength={2000}
                        placeholder="Schreibe eine Nachricht..."
                        onChange={(e) => setCurrentValue(e.target.value)}
                        value={currentValue}
                        onKeyDown={handleKeyDown}
                        disabled={existingBlock.length > 0 ? true : false}
                        style={{ overflowY: 'hidden' }}  // Hide scrollbar initially
                    />

                    <div className="ml-auto flex justify-end">
                        <LetterRestriction limit={2000} currentLength={currentValue.length} />
                    </div>
                </div>

                <div className="ml-2">
                    <Button
                        className="bg-white hover:bg-gray-100 dark:bg-[#0F0F0F] dark:hover:bg-[#151515]"
                        disabled={currentValue.trim() === "" || isLoading}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        <Send className="text-black dark:text-gray-100" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ChatInput;
