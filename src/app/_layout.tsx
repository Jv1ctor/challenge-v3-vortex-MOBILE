// import { AuthProvider } from '@/contexts/auth/auth.provider';
import { AuthProvider } from '@/contexts/auth/auth.provider';
import '../../global.css';

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name='(modals)/machines/[id]'
          options={{
            presentation: 'formSheet',
            animation: "slide_from_bottom", 
            gestureEnabled: true,
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
