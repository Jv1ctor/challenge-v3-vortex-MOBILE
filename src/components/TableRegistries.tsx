import { CardRegistries } from './CardRegistries';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { RegistriesDto } from '@/services/machines/dtos/registries.dto';

type TableRegistriesProps = {
  data: RegistriesDto[] | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

export const TableRegistries = ({ data, refetch, loading }: TableRegistriesProps) => {

  return (
    <View className="flex-1 p-5">
      <Text className="mb-4 ml-1 text-2xl font-semibold">Historico de Registros: </Text>
      <View className='flex-1'> 
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CardRegistries
              value={item.value}
              registryAt={item.createdAt}
              username={item.user.name}
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
              <Text className="text-base text-mutedForeground">Nenhuma registro encontrado</Text>
            </View>
          }
        />
      </View>
    </View>
  );
};
