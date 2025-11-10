import React from "react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import type { Recipe } from "../lib/api/recipes";

type Props = {
  recipe: Recipe;
  // Callback receives the recipe id; type without naming the parameter to avoid no-unused-vars lint
  onOpen?: ((_: string) => void) | undefined;
};

/**
 * PUBLIC_INTERFACE
 * RecipeCard renders a single recipe preview for grid display.
 */
export function RecipeCard({ recipe, onOpen }: Props) {
  return (
    <Card
      className="recipe-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen && onOpen(recipe.id)}
      onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter") onOpen && onOpen(recipe.id); }}
    >
      <div style={{ overflow: "hidden", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: 180, background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(249,250,251,1))" }} />
        )}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 18, lineHeight: "24px" }}>{recipe.title}</h3>
          {typeof recipe.rating === "number" ? (
            <Badge>★ {recipe.rating.toFixed(1)}</Badge>
          ) : null}
        </div>
        <p style={{ margin: "0 0 12px 0", color: "#374151", fontSize: 14 }}>
          {recipe.description || "A delightful recipe to try at home."}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {recipe.cuisine ? <Badge>{recipe.cuisine}</Badge> : null}
          {recipe.difficulty ? <Badge>{recipe.difficulty}</Badge> : null}
          {typeof recipe.prepTimeMinutes === "number" ? <Badge>⏱ {recipe.prepTimeMinutes}m</Badge> : null}
        </div>
      </div>
    </Card>
  );
}
