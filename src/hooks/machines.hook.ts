import { MachineByFactDto } from '@/services/factories/dtos/machines.dto';
import { FactoriesService } from '@/services/factories/factories.service';
import { useCallback, useEffect, useState } from 'react';

export const useMachines = (token: string | null, factoryId: number | null | undefined) => {
  const [data, setData] = useState<MachineByFactDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMachines = useCallback(async () => {
    if (!factoryId || !token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await FactoriesService.listMachinesByFactory(token, factoryId);
      if (!res) {
        setData(null);
        return;
      }
      setData({
        factory_id: res.id,
        factory_name: res.name,
        factory_created_at: res.created_at,
        data: res.data,
      });
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
};
