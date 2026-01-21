import { CardRegistries } from './CardRegistries';
import { Text, View } from 'react-native';

export const TableRegistries = () => {
  return (
    <View className="p-5">
      <Text className="mb-4 ml-1 text-2xl font-semibold">Historico de Registros: </Text>
      <View className="p-1">
        <CardRegistries value={122} registryAt='asda' username="aasdadadsd"/>
        <CardRegistries value={312} registryAt='asdasdasda' username="asdasdaasdad"/>
      </View>
    </View>
  );
};
