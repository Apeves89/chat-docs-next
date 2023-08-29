"use client";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [DocLoading, setDocLoading] = useState(false);

  return (
    <main className="mx-auto flex justify-center h-[100vh]">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        DocLoading={DocLoading}
        setDocLoading={setDocLoading}
      />
      <Chat sidebarOpen={sidebarOpen} DocLoading={DocLoading} />
    </main>
  );
}
