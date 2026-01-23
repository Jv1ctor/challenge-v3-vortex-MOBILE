// "id": 45,
// "value": 400.92,
// "createdAt": "2025-11-11T21:56:00.000Z",
// "user": {
// 	"id": "a59c1a43-43c7-45fd-99df-c0ac7ece6161",
// 	"name": "pedro_oliveira",
// 	"isAdmin": false
// }

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View } from 'react-native';

type CardRegistriesProps = {
  value: number;
  username: string;
  registryAt: string;
};

export const CardRegistries = ({ value, registryAt, username }: CardRegistriesProps) => {
  return (
    <View className="p-1" >
      <View className="relative rounded-lg bg-neutral-50" style={styles.shadow}>
        <View className="relative flex-row items-center justify-between gap-5 p-5">
          <View className="flex-row items-end gap-2">
            <Text className="text-3xl font-bold text-cardForeground">{value.toFixed(2)}</Text>
            <Text className="text-lg font-medium text-mutedForeground">KWH</Text>
          </View>

          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-0.5 bg-accent" />

          <View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="person" size={18} color="#1d6bf5" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="max-w-36 truncate text-lg font-semibold text-accentForeground">
                {username}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <MaterialIcons name="calendar-month" size={18} color="#71717a" />
              <Text className="text-base font-medium text-mutedForeground">{registryAt}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
