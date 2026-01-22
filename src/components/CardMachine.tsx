import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface CardMachineProps {
  name: string;
  model?: string;
  manufacturer?: string;
  lastRecord: string; // formatted date/time
  records: number;
  consumption: number; // kWh
  onPress?: () => void;
}

export const CardMachine: React.FC<CardMachineProps> = ({
  name,
  model,
  manufacturer,
  lastRecord,
  records,
  consumption,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="mx-auto w-full max-w-md"
      accessibilityRole="button"
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      >
      <View className="rounded-lg pr-0.5" style={styles.shadow}>
        <View className="relative">
          <View className="absolute bottom-0 left-0 top-0 w-2 rounded-l-md bg-primary" />
          <View className="ml-2 overflow-hidden rounded-r-md bg-card">
            <View className="p-4">
              <Text className="text-2xl font-semibold text-cardForeground">{name}</Text>
              <Text className="text-sm text-mutedForeground">modelo: {model}</Text>
              <Text className="text-sm text-mutedForeground">Fabricante: {manufacturer}</Text>
              <Text className="mt-1 text-sm text-mutedForeground">
                Último registro: {lastRecord}
              </Text>
            </View>

            <View className="flex-row items-center justify-between bg-sky-50 p-4">
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <FontAwesome5 name="th-list" size={16} color="#71717a" />
                  <Text className="text-sm font-medium text-mutedForeground">REGISTROS</Text>
                </View>
                <Text className="mt-2 text-2xl font-semibold text-cardForeground">{records}</Text>
              </View>

              <View className="flex-1 items-end">
                <View className="flex-row items-center">
                  <MaterialIcons name="bolt" size={20} color="#1d6bf5" />
                  <Text className="ml-2 text-sm font-medium text-mutedForeground">CONSUMO</Text>
                </View>
                <View className="mt-2 flex-row items-end">
                  <Text className="text-2xl font-bold text-cardForeground">
                    {consumption.toFixed(2)}
                  </Text>
                  <Text className="ml-2 text-sm text-mutedForeground">kWh</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    elevation: 2,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  pressed: {
    // transform: [{ translateY: 2 }, { scale: 0.996 }],
    // elevation: 1,
    opacity: 0.9,
  },
});

export default CardMachine;
