import { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Heart, Moon, Sun } from 'lucide-react-native'
import { useTheme } from '@/src/context/theme'

type Props = { title: string; subtitle: string; children: ReactNode; footer: ReactNode }

/** Shared frame for Login and Register: soft blobs, logo, form card, footer link. */
export default function AuthShell({ title, subtitle, children, footer }: Props) {
  const { c, dark, toggle } = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View
        style={{
          position: 'absolute', right: -64, top: -64, height: 240, width: 240,
          borderRadius: 120, backgroundColor: c.accent, opacity: dark ? 0.16 : 0.18,
        }}
      />
      <View
        style={{
          position: 'absolute', left: -96, top: 180, height: 190, width: 190,
          borderRadius: 95, backgroundColor: c.accent, opacity: dark ? 0.1 : 0.12,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <Pressable
          onPress={toggle}
          hitSlop={10}
          accessibilityLabel="Toggle dark mode"
          style={{ position: 'absolute', right: 20, top: 56, zIndex: 5, padding: 6 }}
        >
          {dark ? <Sun size={24} color={c.text} /> : <Moon size={24} color={c.text} />}
        </Pressable>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
          >
            <View style={{ alignItems: 'center', marginBottom: 28 }}>
              <View
                style={{
                  height: 80, width: 80, alignItems: 'center', justifyContent: 'center',
                  borderRadius: 26, backgroundColor: c.accent, transform: [{ rotate: '-8deg' }],
                }}
              >
                <Heart size={38} color="#fff" fill="#fff" />
              </View>
              <Text style={{ marginTop: 16, fontSize: 32, fontWeight: '800', color: c.text, letterSpacing: -1 }}>
                Hunnypie
              </Text>
            </View>

            <View
              style={{
                borderRadius: 28, padding: 24, backgroundColor: c.surface,
                borderWidth: dark ? 1 : 0, borderColor: c.border,
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: '800', color: c.text }}>{title}</Text>
              <Text style={{ marginTop: 4, marginBottom: 20, fontSize: 14, color: c.muted }}>{subtitle}</Text>
              {children}
            </View>

            <View style={{ marginTop: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {footer}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}
