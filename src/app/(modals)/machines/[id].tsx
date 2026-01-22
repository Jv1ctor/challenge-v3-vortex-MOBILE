import { InputRegistries } from '@/components/InputRegistries';
import { TableRegistries } from '@/components/TableRegistries';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/auth.hook';
import { useRegistries } from '@/hooks/registries.hook';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MachinesModal() {
  const { user, isLoading } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getRegistries, insertRegistries } = useRegistries(user?.token ?? null, Number(id));
  
  useEffect(() => {
    if(insertRegistries.loadingInsert)
      getRegistries.refetchRegistries();
  }, [insertRegistries.loadingInsert, getRegistries]);

  if (isLoading && getRegistries.loadingData) {
    return <Spinner />;
  }

  if ((!user?.token && !user?.factoryId) || getRegistries.isErrorData) {
    return <Redirect href={'/Login'} />;
  }

  if (!id) {
    router.back();
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

      <View className="p-5">
        <InputRegistries
          onInsert={insertRegistries.fetchInsertRegistry}
          isError={insertRegistries.isErrorInsert}
          loading={insertRegistries.loadingInsert}
        />
      </View>

      <TableRegistries
        data={getRegistries.data}
        loading={
          insertRegistries.loadingInsert
            ? insertRegistries.loadingInsert
            : getRegistries.loadingData
        }
        refetch={getRegistries.refetchRegistries}
      />
    </SafeAreaView>
  );
}
