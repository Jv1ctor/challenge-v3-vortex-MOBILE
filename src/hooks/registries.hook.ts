import { RegistriesContext } from '@/contexts/registries/registries.context';
import { useContext, useEffect } from 'react';

export const useRegistries = (token?: string | null, machineId?: number | null) => {
  const context = useContext(RegistriesContext);

  if (!context) {
    throw new Error('useRegistries must be inside RegistriesProvider');
  }

  useEffect(() => {
    context.registriesGetter.fetch(token, machineId);
  }, [token, machineId]);


  return { 
    registriesGetter: {
      ...context.registriesGetter,
      fetch: () => context.registriesGetter.fetch(token, machineId)
    },

    registriesSetter: {
      ...context.registriesSetter,
      insert: (value: number) => context.registriesSetter.insert(value, token ?? null, machineId ?? null)
    }
  }
};
