import { ReactNode, useCallback, useState } from 'react';
import { RegistriesContext } from './registries.context';
import { MachineService } from '@/services/machines/machines.service';
import { RegistriesDto } from '@/services/machines/dtos/registries.dto';

type RegistriesProviderProps = {
  children: ReactNode;
};

export const RegistriesProvider = ({ children }: RegistriesProviderProps) => {
  const [data, setData] = useState<RegistriesDto[] | null>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [isErrorData, setIsErrorData] = useState<boolean>(false);

  const [loadingInsert, setLoadingInsert] = useState<boolean>(false);
  const [isErrorInsert, setIsErrorInsert] = useState<boolean>(false);

  const fetchRegistries = useCallback(async (token?: string | null, machineId?: number | null) => {
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
  }, []);

  const fetchInsertRegistry = useCallback(
    async (value: number, token?: string | null, machineId?: number | null) => {
      if (!machineId || !token) return;
      setLoadingInsert(true);
      setIsErrorInsert(false);
      try {
        const res = await MachineService.insertRegistries(token, machineId, value);
        if (!res) {
          setIsErrorInsert(true);
        }
      } catch (err: any) {
        setIsErrorInsert(!!err);
      } finally {
        setLoadingInsert(false);
      }
    },
    []
  );

  return (
    <RegistriesContext.Provider
      value={{
        registriesGetter: {
          data,
          fetch: fetchRegistries,
          isError: isErrorData,
          loading: loadingData,
        },
        registriesSetter: {
          insert: fetchInsertRegistry,
          isError: isErrorInsert,
          loading: loadingInsert,
        },
      }}>
      {children}
    </RegistriesContext.Provider>
  );
};
