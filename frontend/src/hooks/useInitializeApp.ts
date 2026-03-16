import { useEffect, useState } from "react";
import { runMigrations } from "@/data/local/migrations";
import { seedInitialData } from "@/data/local/seed";
import { ensureMonthlyPayments } from "@/repositories/paymentRepository";
import { getCurrentPaymentMonth } from "@/utils/date";

export function useInitializeApp() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        await runMigrations();
        await seedInitialData();
        await ensureMonthlyPayments(getCurrentPaymentMonth());
        setIsReady(true);
      } catch (initializationError) {
        setError(
          initializationError instanceof Error
            ? initializationError.message
            : "Failed to initialize the app."
        );
      }
    }

    void initialize();
  }, []);

  return { isReady, error };
}
