import React, { useEffect, useMemo, useState } from "react";
import { useFeatureFlags } from "../context/FeatureFlagsContext";
import { ApiClient } from "../lib/api/client";
import { RecipesService, type Recipe } from "../lib/api/recipes";

/**
 * PUBLIC_INTERFACE
 * Standalone Recipe Detail Page: can be wired to a router for deep linking if needed.
 */
export default function RecipeDetail({ id }: { id: string }) {
  const flags = useFeatureFlags();
  const service = useMemo(() => new RecipesService(new ApiClient({ mock: Boolean(flags.mockData) }), Boolean(flags.mockData)), [flags]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    service.getById(id).then(r => setRecipe(r || null));
  }, [id, service]);

  if (!recipe) return <div className="container">Loading…</div>;

  return (
    <div className="container" style={{ display: "grid", gap: 12 }}>
      <h1>{recipe.title}</h1>
      {recipe.image ? <img src={recipe.image} alt={recipe.title} style={{ width: "100%", maxWidth: 960, borderRadius: 12 }} /> : null}
      <p style={{ color: "#374151" }}>{recipe.description}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {recipe.cuisine ? <span className="badge">{recipe.cuisine}</span> : null}
        {recipe.difficulty ? <span className="badge">{recipe.difficulty}</span> : null}
        {typeof recipe.prepTimeMinutes === "number" ? <span className="badge">⏱ {recipe.prepTimeMinutes}m</span> : null}
        {typeof recipe.rating === "number" ? <span className="badge">★ {recipe.rating.toFixed(1)}</span> : null}
      </div>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {(recipe.ingredients || []).map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </div>
      <div>
        <h3>Steps</h3>
        <ol>
          {(recipe.steps || []).map((s, idx) => <li key={idx}>{s}</li>)}
        </ol>
      </div>
    </div>
  );
}
