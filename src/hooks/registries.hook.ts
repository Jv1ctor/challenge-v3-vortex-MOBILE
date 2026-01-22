import { RegistriesDto } from '@/services/machines/dtos/registries.dto';
import { MachineService } from '@/services/machines/machines.service';
import { useCallback, useEffect, useState } from 'react';

export const useRegistries = (token: string | null, machineId: number | null | undefined) => {
  const [data, setData] = useState<RegistriesDto[] | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isErrorData, setIsErrorData] = useState<boolean>(false);

  const [loadingInsert, setLoadingInsert] = useState<boolean>(false);
  const [isErrorInsert, setIsErrorInsert] = useState<boolean>(false);

  const fetchRegistries = useCallback(async () => {
    if (!machineId || !token) return;
    setLoadingData(true);
    setIsErrorData(false);
    try {
      const res = await MachineService.getRegistries(token, machineId);
      if (!res) {
        setData(null);
        setIsErrorData(true);
        return;
      }
      setData(res);
    } catch (err: any) {
      setIsErrorData(!!err);
    } finally {
      setLoadingData(false);
    }
  }, [token, machineId]);

  const fetchInsertRegistry = useCallback(
    async (value: number) => {
      if (!machineId || !token) return;
      setLoadingInsert(true);
      setIsErrorInsert(false);
      try {
        const res = await MachineService.insertRegistries(token, machineId, value);
        if (!res) {
          setIsErrorData(true);
        }
      } catch (err: any) {
        setIsErrorData(!!err);
      } finally {
        setLoadingInsert(false);
      }
    },
    [token, machineId]
  );

  useEffect(() => {
    fetchRegistries();
  }, [fetchRegistries]);

  return {
    getRegistries: {
      data,
      loadingData,
      isErrorData,
      refetchRegistries: fetchRegistries,
    },
    insertRegistries: {
      loadingInsert,
      isErrorInsert,
      fetchInsertRegistry
    }
  };
};
