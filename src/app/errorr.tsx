"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h3>Erro ao exibir componente</h3>
    </div>
  );
}
