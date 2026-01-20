import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '@/services/auth/auth.service';
import { User } from '@/types/User.type';

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
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getTokenAsync()
      .then((token) => {setToken(token)
        console.log("hook",token)
      })
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

      await AsyncStorage.setItem('token', result.access_token);
      setToken(result.access_token);
      setUser({
        ...result,
        token: result.access_token,
      })
      setError(false)
      setIsLoading(false);
      return true
    },
    [setIsLoading, setToken, setUser,setError]
  );

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null)
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ login, user, token, logout, error, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
