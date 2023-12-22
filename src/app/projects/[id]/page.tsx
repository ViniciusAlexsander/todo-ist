"use client";

import { useFindProject } from "@/shared/services/projects";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useFindProject(params.id);

  if (isLoading) return <div>isLoading</div>;

  return (
    <div>
      <h1>Nome do projeto: {data?.name}</h1>
      <p>Descrição do projeto: {data?.description}</p>
      <p>Contribuidores:</p>
      <div>
        {data?.projectContribution.map((contribution) => (
          <div key={contribution.id}>
            <p>{contribution.user.name}</p>
            <p>{contribution.user.email}</p>
            <p>-------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
}
