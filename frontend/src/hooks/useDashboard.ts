import { useEffect, useState } from "react";
import type { DashboardSummary } from "@/domain/dashboard";
import { loadDashboardSummary } from "@/services/dashboardService";

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setIsLoading(true);
      const nextSummary = await loadDashboardSummary();
      setSummary(nextSummary);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return { summary, isLoading, error, refresh };
}
