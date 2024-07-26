"use client";

import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { askQuestion, Message } from "@/actions/askQuestion";
import { Loader2Icon } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: string;
  createdAt: Date;
};

function Chat({ id }: { id: string }) {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    if (!snapshot) return;

    console.log("Updated snapshot", snapshot.docs);

    // get second last message to check if the AI is thinking
    const lastMessage = messages.pop();
  }, [snapshot]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const q = input;

    setInput("");

    // Optimistic UI Update
    setMessages((prev) => [
        ...prev,
        {
            role: "human",
            message: q,
            createdAt: new Date(),
        },
        {
            role: "ai",
            message: "Thinking....",
            createdAt: new Date(),
        },
    ])

    startTransition(async() => {
        const { success, message } = await askQuestion(id, q);
        if (!success) {
           // toast({
             //   variant: "destructive",
              //  title: "Error",
              //  description: "message",
          //  });
            setMessages((prev) => prev.slice(0, prev.length - 1).concat([
                {
                    role: "ai",
                    message: `Whoops... ${message}`,
                    createdAt: new Date();
                }
            ]))
        }
    })
  };
  return (
    <div className="flex flex-col h-full overflow-scroll">
      {/**Chat contents */}
      <div className="flex-1 w-full">{/**Chat messages.... */}</div>

      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-green-600/75"
      >
        <Input
          placeholder="Ask a Question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={!input || isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin text-green-600" />
          ) : (
            "Ask"
          )}
        </Button>
      </form>
    </div>
  );
}

export default Chat;
