import { CardMachine } from '@/components/CardMachine';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/auth.hook';
import { useMachines } from '@/hooks/machines.hook';
import { useRegistries } from '@/hooks/registries.hook';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const { user, isLoading, logout} = useAuth();
  const { registriesSetter } = useRegistries();
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

  useEffect(() => {
    if (registriesSetter.loading) refetch();
  }, [registriesSetter.loading]);

  if (isLoading && loading) {
    return <Spinner />;
  }

  if ((!user?.token && !user?.factoryId) || isError) {
    logout()
    return <Redirect href={'/Login'} />;
  }

  const handleOpenModalRegistries = (machineId: number, machineName: string) => {
    if (!openModal) {
      router.push({
        pathname: `/(modals)/machines/${machineId}`,
        params: {
          machineName: machineName,
        },
      });
    }
    setOpenModal(true);
  };

  return (
    <>
      <View className="border-b border-border bg-background px-6 pb-3 pt-20">
        <Text className="text-3xl font-bold text-foreground">{machines?.factory_name}</Text>
        <Text className="mt-1 text-sm text-mutedForeground">Gerenciamento da Maquinas</Text>
      </View>

      <SafeAreaView className="bg-zin-50 -mt-16 flex-1">
        <View className="flex-1 px-4 pt-4">
          <FlatList
            data={machines?.data}
            renderItem={({ item }) => (
              <CardMachine
                consumption={item.total_value}
                onPress={() => handleOpenModalRegistries(item.id, item.name)}
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
                refreshing={registriesSetter.loading ? registriesSetter.loading : loading}
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
    </>
  );
}
