"use client";

import { useProjects } from "@/shared/services/projects";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data, isLoading } = useProjects();
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (isLoading) return <div>isLoading</div>;

  return (
    <div>
      {data &&
        data?.map((project) => <div key={project.id}>{project.name}</div>)}
    </div>
  );
}
