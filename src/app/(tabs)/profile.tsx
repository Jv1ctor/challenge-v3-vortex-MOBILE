import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/auth.hook';
import { useRouter } from 'expo-router';
export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.replace('/Login');
  };

  return (
    <>
      <View className="border-b border-border bg-background px-6 pb-3 pt-20">
        <Text className="text-3xl font-bold text-foreground">Perfil</Text>
        <Text className="mt-1 text-sm text-mutedForeground">Gerenciamento de conta</Text>
      </View>

      <View className="mt-10 items-center gap-10 px-10">
        <View className="w-full items-center rounded-xl bg-card p-5" style={styles.shadow}>
          <MaterialIcons name="account-circle" size={110} color="#71717a" />
          <View>
            <Text className="text-3xl font-semibold text-foreground">Username</Text>
            <Text className="text-center text-xl font-bold text-accentForeground">Fabrica x</Text>
            <Text className="text-center text-lg font-bold text-primary">Operador</Text>
          </View>
        </View>

        <View className="flex-row gap-10 self-start">
          <View className="gap-3 rounded-xl bg-card p-5" style={styles.shadow}>
            <View className="flex-row items-center gap-5">
              <Text className="max-w-44 truncate text-wrap text-lg font-medium text-mutedForeground">
                REGISTROS
              </Text>
              <FontAwesome5 name="th-list" size={18} color="#1d6bf5" />
            </View>

            <Text className="text-2xl font-semibold text-foreground">123123</Text>
          </View>

          <View className="gap-3 rounded-xl bg-card p-5" style={styles.shadow}>
            <View className="flex-row items-center gap-5">
              <Text className="max-w-44 truncate text-wrap text-lg font-medium text-mutedForeground">
                REGISTROS
              </Text>
              <MaterialCommunityIcons name="clock" size={20} color="#1d6bf5" />
            </View>

            <Text className="text-2xl font-semibold text-foreground">123123</Text>
          </View>
        </View>

        <Button className="w-2/3 bg-destructive" onClick={handleLogout}>
          Sair
        </Button>
      </View>
    </>
  );
}

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
