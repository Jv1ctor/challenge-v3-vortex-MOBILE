import { Pressable, Text, TextInput, View } from 'react-native';
import { Button } from './ui/Button';

export const InputRegistries = () => {
  return (
    <View>
      <View className="mb-8 flex-row justify-between rounded-lg bg-muted px-4 py-2">
        <View className="flex-row items-center gap-2">
          <Text>[O]</Text>

          <View>
            <Text className="font-medium text-mutedForeground">DATA</Text>
            <Text className="font-medium text-foreground">10/11/20</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Text>[O]</Text>

          <View>
            <Text className="font-medium text-mutedForeground">HORA</Text>
            <Text className="font-medium text-foreground">10:50</Text>
          </View>
        </View>
      </View>

      <View className="gap-3 items-center mb-6">
        <View className="flex-row items-center justify-between gap-6">
          <Pressable className="rounded-xl border-2 border-border px-4 py-2">
            <Text className="text-3xl text-mutedForeground">-</Text>
          </Pressable>

          <View className="flex-1 items-center rounded-xl border-2 border-border py-1">
            <Text className="text-base font-medium text-mutedForeground">Consumo (kWh)</Text>
            <TextInput keyboardType="decimal-pad" className="text-4xl font-bold text-foreground" value="400.0" />
          </View>

          <Pressable className="rounded-xl border-2 border-border px-4 py-2">
            <Text className="text-3xl text-mutedForeground">+</Text>
          </Pressable>
        </View>
        <Text className="text-mutedForeground">Última: 354.0 kWh</Text>
      </View>

      <Button onClick={() => {}}>Inserir Registro</Button>
    </View>
  );
};
