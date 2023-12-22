"use client";

import { useFindProject } from "@/shared/services/projects";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useFindProject(params.id);

  if (isLoading) return <div>isLoading</div>;

  return <h1>{data?.name}</h1>;
}
