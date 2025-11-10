import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export type Filters = {
  search: string;
  cuisine: string;
  difficulty: "" | "easy" | "medium" | "hard";
};

type Props = {
  value: Filters;
  onChange: (/* value */ Filters) => void;
  onApply?: () => void;
  onReset?: () => void;
};

/**
 * PUBLIC_INTERFACE
 * SearchFilters renders a sidebar/top-bar for filtering recipe list.
 */
export function SearchFilters({ value, onChange, onApply, onReset }: Props) {
  const [local, setLocal] = useState<Filters>(value);
  useEffect(() => setLocal(value), [value]);

  function update<K extends keyof Filters>(key: K, v: Filters[K]) {
    const next = { ...local, [key]: v };
    setLocal(next);
  }

  return (
    <div className="sidebar" aria-label="Search and Filters">
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <label htmlFor="search" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Search</label>
          <input
            id="search"
            className="input"
            placeholder="Search recipes, ingredients..."
            value={local.search}
            onChange={e => update("search", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cuisine" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Cuisine</label>
          <input
            id="cuisine"
            className="input"
            placeholder="e.g., Italian, Indian"
            value={local.cuisine}
            onChange={e => update("cuisine", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="difficulty" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Difficulty</label>
          <select
            id="difficulty"
            className="select"
            value={local.difficulty}
            onChange={e => update("difficulty", e.target.value as Filters["difficulty"])}
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Button
            onClick={() => {
              onChange(local);
              onApply?.();
            }}
          >
            Apply
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const reset: Filters = { search: "", cuisine: "", difficulty: "" };
              setLocal(reset);
              onChange(reset);
              onReset?.();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
