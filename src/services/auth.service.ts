import { getApiBaseUrl } from "@/config/env";

type LoginData = {
  username: string;
  password: string;
};

type ResponseApiLogin = {
  access_token: string;
};

export const AuthService = {
  async loginRequest(data: LoginData): Promise<string | null> {
    try {
      const body = JSON.stringify({
        username: data.username,
        password: data.password,
      });

      const response = await fetch(`${getApiBaseUrl()}/api/auth/mobile/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`RESPONSE STATUS: ${response.status}`);
      }

      const result: ResponseApiLogin = await response.json();
      return result.access_token;
    } catch (error) {
      if (error instanceof Error) console.warn(error.message);
      return null;
    }
  },
};
