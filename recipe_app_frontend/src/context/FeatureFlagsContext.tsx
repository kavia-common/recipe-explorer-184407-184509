import React, { createContext, useContext, useMemo } from "react";

export type FeatureFlags = {
  mockData?: boolean;
  [key: string]: boolean | undefined;
};

type FlagsContextValue = {
  flags: FeatureFlags;
};

// PUBLIC_INTERFACE
export const FeatureFlagsContext = createContext<FlagsContextValue>({ flags: {} });

/**
 * PUBLIC_INTERFACE
 * Provides feature flags to the React component tree.
 * Reads VITE_FEATURE_FLAGS as a comma-separated list (e.g., "mockData,newUI").
 */
export function FeatureFlagsProvider({ children }: { children: React.ReactNode }) {
  const raw = import.meta.env.VITE_FEATURE_FLAGS as string | undefined;
  const flags = useMemo<FeatureFlags>(() => {
    if (!raw) return {};
    const map: FeatureFlags = {};
    raw.split(",").map(s => s.trim()).filter(Boolean).forEach(k => { map[k] = true; });
    return map;
  }, [raw]);

  return (
    <FeatureFlagsContext.Provider value={{ flags }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * Hook to access feature flags.
 */
export function useFeatureFlags(): FeatureFlags {
  return useContext(FeatureFlagsContext).flags;
}
