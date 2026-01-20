import { getApiBaseUrl } from "@/config/env";
import { ResponseMachinesByFactory } from "./machines.type";
import { formatDate } from "@/lib/formatted-data";



export const MachinesService = {
  async listMachinesByFactory(factoryId: number){
    try {
        const response = await fetch(`${getApiBaseUrl()}/api/factories/${factoryId}/machines`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`RESPONSE STATUS: ${response.status}`);
        }

        const result: ResponseMachinesByFactory = await response.json();
        return result.data.map(it => ({
          ...it,
          created_at: formatDate(it.created_at),
          updated_at: formatDate(it.updated_at),
          last_registry_at: formatDate(it.last_registry_at),
        }))
    } catch (error) {
        if (error instanceof Error) console.warn(error.message);
        return null;
    }
  },

}