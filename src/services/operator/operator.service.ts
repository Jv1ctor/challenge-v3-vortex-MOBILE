import { getApiBaseUrl } from '@/config/env';
import { ResponseGetProfile } from './operator.type';
import { formatDate } from '@/lib/formatted-data';

export const OperatorService = {
  async getProfile(token: string): Promise<ResponseGetProfile | null> {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/users/operator`, {
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

      const result: ResponseGetProfile = await response.json();
      return {
        ...result,
        last_registry_at: result.last_registry_at ? formatDate(result.last_registry_at) : null,
      };
    } catch (error) {
      if (error instanceof Error) console.warn(error.message);
      return null;
    }
  },
};
