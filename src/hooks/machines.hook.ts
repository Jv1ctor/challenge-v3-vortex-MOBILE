import { MachinesService } from "@/services/machines/machines.service";
import { ResponseMachinesByFactory } from "@/services/machines/machines.type";
import { useCallback, useEffect, useState } from "react";

export const useMachines = (token: string | null, factoryId: number | null | undefined) => {
  const [data, setData] = useState<ResponseMachinesByFactory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMachines = useCallback(async () => {
    if (!factoryId || !token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await MachinesService.listMachinesByFactory(token, factoryId);
      setData(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token, factoryId]);

  useEffect(() => {
    fetchMachines();
  }, [fetchMachines]);

  return { data, loading, error, refetch: fetchMachines };
}