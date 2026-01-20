// import { AuthProvider } from '@/contexts/auth/auth.provider';
import { AuthProvider } from '@/contexts/auth/auth.provider';
import '../../global.css';

import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
