import { CardMachine } from '@/components/CardMachine';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/auth.hook';
import { useMachines } from '@/hooks/machines.hook';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const { user, isLoading } = useAuth();
  const {
    data: machines,
    loading,
    refetch,
    isError,
  } = useMachines(user?.token ?? null, user?.factoryId);

  useFocusEffect(
    useCallback(() => {
      setOpenModal(false);
    }, [setOpenModal])
  );

  if (isLoading && loading) {
    return <Spinner />;
  }

  if ((!user?.token && !user?.factoryId) || isError) {
    return <Redirect href={'/Login'} />;
  }

  const handleOpenModalRegistries = (machineId: number) => {
    if (!openModal) {
      router.push({
        pathname: `/(modals)/machines/${machineId}`,
      });
    }
    setOpenModal(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="border-b border-border px-6 pb-3 pt-4">
        <Text className="text-3xl font-bold text-foreground">{machines?.factory_name}</Text>
        <Text className="mt-1 text-sm text-mutedForeground">Gerenciamento da Maquinas</Text>
      </View>

      <View className="flex-1 bg-zinc-50 px-4 pt-4">
        <FlatList
          data={machines?.data}
          renderItem={({ item }) => (
            <CardMachine
              consumption={item.total_value}
              onPress={() => handleOpenModalRegistries(item.id)}
              lastRecord={item.last_registry_at}
              name={item.name}
              records={item.total_registries}
              model={item.model}
              manufacturer={item.manufacturer}
            />
          )}
          keyExtractor={(it) => String(it.id)}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refetch}
              tintColor="#1d6bf5"
              colors={['#1d6bf5']}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-base text-mutedForeground">Nenhuma máquina encontrada</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
