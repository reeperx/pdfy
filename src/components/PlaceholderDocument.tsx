"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";


function PlaceholderDocument() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/dashboard/upload");
    }
  return (
    <Button onClick={handleClick} className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-white border-2 border-green-600 drop-shadow-md hover:text-white text-green-600">
      <PlusCircleIcon className="h-16 w-16" />
      <p>Add a Document</p>
    </Button>
  );
}

export default PlaceholderDocument;
