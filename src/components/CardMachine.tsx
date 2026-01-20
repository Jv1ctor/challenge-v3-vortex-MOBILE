import { Text, View } from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export const CardMachine = () => {


  return(
    <View>
      <View className="shadow-lg bg-card w-full max-w-md mx-auto rounded-md border-l-8  border-primary">
        <View className="p-3">
          <Text className="text-lg font-semibold text-cardForeground">Torno CNC-001</Text>
          <Text>modelo: CNC-500X</Text>
          <Text>Fabricante: TechMachine</Text>
          <Text>Criado em: 14/02/20 - 15:20</Text>
          <Text>Ultimo registro em: 15/02/20 = 14:20</Text>
        </View>

        {/* <View className="bg-secondary w-full h-1 rounded-md"/> */}

        <View className="bg-slate-100 flex-row justify-between gap-5 p-5 rounded-br-md">
         
          <View>
            <View className="flex-row items-center gap-2">
               <FontAwesome5 name="th-list" size={16} color="#71717a" />
              <Text className="text-base text-mutedForeground font-medium">REGISTROS</Text>
            </View>
    
            <Text className="font-medium text-2xl mr-1">5</Text>

          </View>

          <View>
            <View className="flex-row items-center">
              <MaterialIcons name="bolt" size={24} color="#1d6bf5" />
              <Text className="text-base text-mutedForeground font-medium">CONSUMO</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="font-bold text-2xl mr-1">1396.53</Text>
              <Text className="text-mutedForeground font-medium">kWh</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}