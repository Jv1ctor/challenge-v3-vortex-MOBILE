import { getApiBaseUrl } from '@/config/env';
import { GetRegistriesResponseDto, RegistriesDto } from './dtos/registries.dto';
import { formatDate } from '@/lib/formatted-data';

const validateValue = (value: number) => {
  if (typeof value !== 'number') return null;
  if (value < 0) return null;
  return value;
};

export const MachineService = {
  async getRegistries(token: string, machineId: number): Promise<RegistriesDto[] | null> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/machines/${machineId}/registries`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`RESPONSE STATUS: ${response.status}`);
      }

      const result: GetRegistriesResponseDto = await response.json();
      return result.data.map((it) => ({
        ...it,
        createdAt: formatDate(it.createdAt),
      }));

    } catch (error) {
      if (error instanceof Error) console.warn(error.message);
      return null;
    }
  },

  async insertRegistries(token: string, machineId: number, value: number) {
    try {
      const body = {
        value: validateValue(value),
      };

      if(!body.value) return false

      const response = await fetch(`${getApiBaseUrl()}/api/machines/${machineId}/registries`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`RESPONSE STATUS: ${response.status}`);
      }

      if(response.status !== 201)
        return false
      
      return true
    } catch (error) {
      if (error instanceof Error) console.warn(error.message);
      return false;
    }
  },
};
