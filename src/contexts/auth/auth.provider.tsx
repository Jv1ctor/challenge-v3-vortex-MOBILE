import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@/services/auth.service';

type AuthProviderProps = {
  children: ReactNode;
};

const getTokenAsync = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    throw error;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getTokenAsync()
      .then((token) => setToken(token))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      const result = await AuthService.loginRequest({ username, password });

      if (!result) {
        setIsLoading(false);
        setError(true);
        return;
      }

      await AsyncStorage.setItem('token', result);
      setToken(result);
      setIsLoading(false);
    },
    [setIsLoading, setToken, setError]
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ login, token, logout, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
