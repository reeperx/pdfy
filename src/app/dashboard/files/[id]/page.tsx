import Chat from "@/components/Chat";
import PdfView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import React from "react";

async function ChatToFilePage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  auth().protect();

  const { userId } = await auth();

  const ref = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .get();

  const url = ref.data()?.downloadUrl;
  return (
    <div className="grid lg:grid-cols-5 h-full overflow-hidden">
      {/** Left PDF renderer */}
      <div className="col-span-5 lg:col-span-3 bg-green-100 border--2 lg:border-green-600 lg:order-1 overflow-auto">
        {/** PdfView */}
        <PdfView url={url} />
      </div>
      {/** Right Chat side */}
      <div className="col-span-5 lg:col-span-2 overflow-y-auto">
        {/** chat */}
        <Chat id={id} />
      </div>
    </div>
  );
}

export default ChatToFilePage;
