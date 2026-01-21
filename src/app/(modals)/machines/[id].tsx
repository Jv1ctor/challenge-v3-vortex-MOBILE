import { TableRegistries } from '@/components/TableRegistries';
import { Input } from '@/components/ui/Input';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MachinesModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handleBackScreen = () => router.back();

  if (!id) {
    handleBackScreen();
    return;
  }

  return (
    <SafeAreaView className="flex-1 bg-card">
      <View className="items-center py-4">
        <View className="h-1 w-10 rounded-full bg-slate-500" />
      </View>

      <View className="border-b border-border px-6 pb-3 pt-4">
        <Text className="text-3xl font-bold text-foreground">maquina</Text>
        <Text className="mt-1 text-sm text-mutedForeground">Gerenciamento de registros</Text>
      </View>

      <View className='p-5'>

        <InputRegistries

      </View>

      <TableRegistries />
    </SafeAreaView>
  );
}
