import React, { useEffect, useMemo, useState } from "react";
import { useFeatureFlags } from "../context/FeatureFlagsContext";
import { ApiClient } from "../lib/api/client";
import { RecipesService, type Recipe, type RecipeQuery } from "../lib/api/recipes";
import { SearchFilters, type Filters } from "../components/SearchFilters";
import { RecipeCard } from "../components/RecipeCard";
import { Modal } from "../components/ui/Modal";

function useRecipes() {
  const flags = useFeatureFlags();
  const service = useMemo(() => {
    const client = new ApiClient({ mock: Boolean(flags.mockData) });
    const svc = new RecipesService(client, Boolean(flags.mockData));
    return svc;
  }, [flags]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const fetchList = async (query: RecipeQuery) => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await service.list(query);
      setRecipes(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  const getById = (id: string) => service.getById(id);

  return { recipes, loading, error, fetchList, getById };
}

/**
 * PUBLIC_INTERFACE
 * Home route with responsive grid of recipes and filter sidebar.
 */
export default function HomeRoute() {
  const [filters, setFilters] = useState<Filters>({ search: "", cuisine: "", difficulty: "" });
  const { recipes, loading, error, fetchList, getById } = useRecipes();

  const [openId, setOpenId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchList(filters);
    // Initial fetch on mount
  }, []);

  async function openDetail(id: string) {
    setOpenId(id);
    const r = await getById(id);
    setDetail(r || null);
  }

  function onApplyFilters() {
    fetchList(filters);
  }

  return (
    <div>
      <div className="gradient-header">
        <div className="container">
          <div className="header">
            <h1 style={{ margin: 0 }}>Recipe Explorer</h1>
            <div style={{ opacity: 0.9, fontSize: 14 }}>Discover tasty recipes</div>
          </div>
        </div>
      </div>

      <div className="container" style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
          {/* For larger screens, show two columns: sidebar + grid */}
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr", alignItems: "start" }}>
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
              {/* Responsive layout: Sidebar above on small; beside on large via CSS media query */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                <SearchFilters
                  value={filters}
                  onChange={setFilters}
                  onApply={onApplyFilters}
                  onReset={() => fetchList({ search: "", cuisine: "", difficulty: "" })}
                />
              </div>
              {loading ? <div>Loading recipes…</div> : null}
              {error ? <div role="alert" style={{ color: "var(--color-error)" }}>{error}</div> : null}
              <div className="grid" aria-live="polite">
                {recipes.map(r => (
                  <RecipeCard key={r.id} recipe={r} onOpen={openDetail} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={Boolean(openId)}
        onClose={() => { setOpenId(null); setDetail(null); }}
        title={detail?.title || "Recipe Details"}
      >
        {!detail ? (
          <div>Loading…</div>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {detail.image ? (
              <img src={detail.image} alt={detail.title} style={{ width: "100%", borderRadius: 12, maxHeight: 280, objectFit: "cover" }} />
            ) : null}
            <p style={{ margin: 0, color: "#374151" }}>{detail.description}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {detail.cuisine ? <span className="badge">{detail.cuisine}</span> : null}
              {detail.difficulty ? <span className="badge">{detail.difficulty}</span> : null}
              {typeof detail.prepTimeMinutes === "number" ? <span className="badge">⏱ {detail.prepTimeMinutes}m</span> : null}
              {typeof detail.rating === "number" ? <span className="badge">★ {detail.rating.toFixed(1)}</span> : null}
            </div>
            <div>
              <h4>Ingredients</h4>
              <ul>
                {(detail.ingredients || []).map((i, idx) => <li key={idx}>{i}</li>)}
              </ul>
            </div>
            <div>
              <h4>Steps</h4>
              <ol>
                {(detail.steps || []).map((s, idx) => <li key={idx}>{s}</li>)}
              </ol>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
