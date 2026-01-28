import { Pressable, Text, TextInput, View } from 'react-native';
import { Button } from './ui/Button';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { getDate, getTime } from '@/lib/formatted-data';

type InputRegistriesProps = {
  onInsert: (value: number) => Promise<void>;
  isError: boolean;
};

export const InputRegistries = ({ onInsert, isError }: InputRegistriesProps) => {
  const datetime = new Date();
  const [value, setValue] = useState(0);
  const [error, setError] = useState(false);

  const handleAdd = () => {
    setError(false);
    if (value < 1000000) {
      setValue((prev) => {
        let valueInsert = prev;

        valueInsert += 5;
        if (valueInsert >= 1000000) {
          valueInsert = 1000000;
        }
        return valueInsert;
      });
    }
  };

  const handleSub = () => {
    setError(false);
    if (value <= 4) {
      setValue(0);
      return;
    }
    setValue(value - 5);
  };

  const handleTextChange = (text: string) => {
    setError(false);
    const digit = text.replace(/\D/g, '');
    if (!digit) return;
    if (Number(digit) > 1000000) return;

    setValue(Number(digit));
  };

  const handleInsert = async () => {
    const formatted = formatCurrency(value);
    const finalValue = Number(formatted);
    if (finalValue > 0) {
      await onInsert(finalValue);
      if (isError) {
        if (isError) setError(true);
      }
    }

    setValue(0);
  };

  const formatCurrency = (value: number) => {
    return (value / 100).toFixed(2);
  };

  return (
    <View>
      <View className="mb-8 flex-row justify-between rounded-lg bg-muted px-4 py-2">
        <View className="flex-row items-center gap-2">
          <FontAwesome6 name="calendar" size={18} color="#71717a" />

          <View>
            <Text className="font-medium text-mutedForeground">DATA</Text>
            <Text className="font-medium text-foreground">{getDate(datetime)}</Text>
          </View>
        </View>

        <View className="h-10 w-0.5 self-center bg-accent" />

        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons name="clock" size={20} color="#71717a" />

          <View>
            <Text className="font-medium text-mutedForeground">HORA</Text>
            <Text className="font-medium text-foreground">{getTime(datetime)}</Text>
          </View>
        </View>
      </View>

      <View className="mb-6 items-center gap-3">
        <View className="flex-row items-center justify-between gap-6">
          <Pressable
            onPress={handleSub}
            className="rounded-xl border-2 border-border px-4 py-2 active:opacity-75">
            <Text className="text-3xl text-mutedForeground">-</Text>
          </Pressable>

          <View className="flex-1 items-center rounded-xl border-2 border-border py-1">
            <Text className="text-base font-medium text-mutedForeground">Consumo (kWh)</Text>
            <TextInput
              keyboardType="decimal-pad"
              className="w-full text-center text-4xl font-bold text-foreground"
              value={formatCurrency(value)}
              onChangeText={handleTextChange}
            />
          </View>

          <Pressable
            onPress={handleAdd}
            className="rounded-xl border-2 border-border px-4 py-2 active:opacity-75">
            <Text className="text-3xl text-mutedForeground">+</Text>
          </Pressable>
        </View>
        {error && (
          <Text className="text-md items-center text-destructive">
            Valor inserido deve ser menor que 10000
          </Text>
        )}
      </View>

      <Button className="w-2/3 self-center" onClick={handleInsert}>
        Inserir Registro
      </Button>
    </View>
  );
};
