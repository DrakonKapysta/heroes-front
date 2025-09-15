import { HeroFilter } from "@/components/Hero/HeroFilter";
import { HeroList } from "@/components/Hero/HeroList";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["heroes", query],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/superheroes?${query}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(
          `Failed to fetch heroes. Status: ${res.status} (${res.statusText})`
        );
      }
      return await res.json();
    },
  });
  if (error) {
    return (
      <div className="flex-1 w-full h-full flex justify-center items-center">
        <span className="text-red-500 text-xl">
          An error occurred: {(error as Error).message}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-2 flex-1 gap-2">
      <HeroFilter
        setQuery={(query: string) => setQuery(query)}
        totalPages={data?.last_page}
        currentPage={data?.page}
        totalHeroes={data?.total}
      />
      {isLoading ? (
        <div className="flex-1 w-full h-full flex justify-center items-center">
          <div className="w-12 h-12 rounded-full border-b-3 animate-spin border-white self-center"></div>
        </div>
      ) : (
        <HeroList heroes={data.data} />
      )}
    </div>
  );
}
