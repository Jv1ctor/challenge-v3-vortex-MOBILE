import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@/services/auth/auth.service';
import { User } from '@/types/User.type';

type AuthProviderProps = {
  children: ReactNode;
};

const getUserAsync = async (): Promise<User | null> => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user) as User;
  } catch (error) {
    console.error('Erro ao buscar token:', error);
    throw error;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getUserAsync()
      .then((user) => setUser(user))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      const result = await AuthService.loginRequest({ username, password });
      if (!result) {
        setIsLoading(false);
        setError(true);
        return false;
      }

      // await AsyncStorage.setItem('token', result.access_token);
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          id: result.id,
          token: result.access_token,
          factoryId: result.factoryId,
          isAdmin: result.isAdmin,
          name: result.name,
        })
      );
      // setToken(result.access_token);
      setUser({
        ...result,
        token: result.access_token,
      });
      setError(false);
      setIsLoading(false);
      return true;
    },
    [setIsLoading, setUser, setError]
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ login, user, logout, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
