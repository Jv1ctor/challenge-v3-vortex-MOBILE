import { Text, View } from 'react-native';
import { Input } from './ui/Input';
import { InputPassword } from './ui/InputPassword';
import { Button } from './ui/Button';
import { useState } from 'react';
import { useAuth } from '@/hooks/auth.context';

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!username || !password) {
      setErrorMessage('Usuario e Senha devem ser preenchidos');
      return;
    }

    const token = await login(username, password)

  };

  const handleChange = (value: string, setter: (arg: string) => void) => {
    setter(value);
    setErrorMessage(null);
  };

  return (
    <View>
      <Input
        value={username}
        onChangeValue={(text) => handleChange(text, setUsername)}
        label="Usuario"
        placeholder="Digite seu nome de usuario"
        className="mb-10"
      />

      <View className="mb-14">
        <InputPassword
          value={password}
          onChangeValue={(text) => handleChange(text, setPassword)}
          label="Senha"
          placeholder="Digite sua senha"
          className="mb-4"
        />
        {errorMessage && <Text className="px-3 font-medium text-destructive">{errorMessage}</Text>}
      </View>
      <View className="items-center">
        <Button onClick={handleSubmit} className="w-3/4">
          Entrar
        </Button>
      </View>
    </View>
  );
};
