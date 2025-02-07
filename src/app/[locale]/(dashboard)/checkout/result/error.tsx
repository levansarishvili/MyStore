"use client";

export default function Error({ error }: { error: Error }) {
  return <h2 className="mt-16">{error.message}</h2>;
}
