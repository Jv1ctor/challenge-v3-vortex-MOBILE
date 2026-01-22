import { getApiBaseUrl } from "@/config/env";
import { MachineByFactResDto } from "./dtos/machines.dto";
import { formatDate } from "@/lib/formatted-data";



export const FactoriesService = {
   async listMachinesByFactory(token: string, factoryId: number) {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/factories/${factoryId}/machines`, {
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
      
      const result: MachineByFactResDto = await response.json();
      return {
        ...result,
        data: result.data.map((it) => ({
          ...it,
          created_at: formatDate(it.created_at),
          updated_at: formatDate(it.updated_at),
          last_registry_at: formatDate(it.last_registry_at),
        })),
      };
    } catch (error) {
      if (error instanceof Error) console.warn(error.message);
      return null;
    }
  },
};
