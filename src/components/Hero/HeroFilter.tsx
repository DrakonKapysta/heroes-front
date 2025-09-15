import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useState,
  type FC,
  type ComponentPropsWithoutRef,
  useEffect,
} from "react";
import { Superpower, SuperpowerLabels } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";

export interface HeroFilterProps extends ComponentPropsWithoutRef<"div"> {
  setQuery: (query: string) => void;
  totalPages?: number;
  currentPage?: number;
  totalHeroes?: number;
}

export const HeroFilter: FC<HeroFilterProps> = ({
  totalPages,
  currentPage,
  totalHeroes,
  setQuery,
}) => {
  const [search, setSearch] = useState("");
  const [selectedSuperpowers, setSelectedSuperpowers] = useState<Superpower[]>(
    []
  );
  const [limit, setLimit] = useState("5");
  const [page, setPage] = useState("1");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("limit", limit);
    if (page) {
      params.append("page", page);
    }
    if (search) params.append("search", search);
    if (selectedSuperpowers.length > 0) {
      params.append("superpowers", selectedSuperpowers.join(","));
    }
    params.append("sortBy", sortBy);
    params.append("sortOrder", sortOrder);
    setQuery(params.toString());
  }, [debouncedSearch, selectedSuperpowers, sortBy, sortOrder, limit, page]);

  useEffect(() => {
    if (totalHeroes && currentPage) {
      const isValidPage =
        Math.ceil(totalHeroes / parseInt(limit)) >= Number(currentPage);
      if (!isValidPage) {
        setPage("1");
      }
    }
  }, [currentPage]);

  const handleSuperpowerChange = (superpower: Superpower, checked: boolean) => {
    if (checked) {
      setSelectedSuperpowers([...selectedSuperpowers, superpower]);
    } else {
      setSelectedSuperpowers(
        selectedSuperpowers.filter((sp) => sp !== superpower)
      );
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-4 flex-wrap items-center">
          <div className="space-y-2 flex-1">
            <Label htmlFor="search">Search by nickname/real name</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search heroes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nickname">Nickname</SelectItem>
                <SelectItem value="real_name">Real Name</SelectItem>
                <SelectItem value="created_at">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Sort order</Label>
            <Select
              value={sortOrder}
              onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 ">
            <Label>Limit</Label>
            <Select
              value={limit}
              onValueChange={(value) => {
                const isValidPage =
                  Math.ceil(totalHeroes! / parseInt(value)) >= Number(page);
                if (!isValidPage) {
                  setPage("1");
                }
                setLimit(value);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 ">
            <Label>Page</Label>
            <Select
              value={page}
              onValueChange={(value) => {
                setPage(value);
              }}
            >
              <SelectTrigger disabled={!totalPages || !currentPage}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
                  (p) => (
                    <SelectItem key={p} value={p.toString()}>
                      {p}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Filter by superpowers</Label>
          <div className="h-32 overflow-y-auto border rounded-md p-3 bg-white">
            <div className="grid grid-cols-2 gap-2">
              {Object.values(Superpower).map((superpower) => (
                <div key={superpower} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${superpower}`}
                    checked={selectedSuperpowers.includes(superpower)}
                    onCheckedChange={(checked) =>
                      handleSuperpowerChange(superpower, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`filter-${superpower}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {SuperpowerLabels[superpower]}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
