import { CardMachine } from '@/components/CardMachine';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/hooks/auth.hook';
import { useMachines } from '@/hooks/machines.hook';
import { Redirect } from 'expo-router';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { user, isLoading } = useAuth();
  const { data, loading, refetch } = useMachines(user?.token ?? null, user?.facotyId);
  if (isLoading) {
    return <Spinner />;
  }

  if (!user?.token) {
    return <Redirect href={'/Login'} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="border-b border-border px-6 pb-3 pt-4">
        <Text className="text-3xl font-bold text-foreground">Máquinas</Text>
        <Text className="mt-1 text-sm text-mutedForeground">Gerenciamento da fábrica</Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        {loading && !data ? (
          <View className="flex-1 items-center justify-center">
            <Spinner />
          </View>
        ) : (
          <FlatList
            data={data?.data}
            renderItem={({ item }) => (
              <CardMachine
                consumption={item.total_value}
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
        )}
      </View>
    </SafeAreaView>
  );
}
