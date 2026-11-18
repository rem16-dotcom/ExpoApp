import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native'
import { useTheme } from '@/src/context/theme'

interface BtnProps extends Omit<PressableProps, 'children'> {
    label: string
    loading?: boolean
}

export default function Button({ label, loading, disabled, ...props }: BtnProps) {
  const { c } = useTheme()
  return (
    <Pressable
      {...props}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: c.accent,
        paddingVertical: 16,
        opacity: loading ? 0.7 : pressed ? 0.85 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color={c.onAccent} />
      ) : (
        <Text style={{ fontSize: 16, fontWeight: '800', color: c.onAccent }}>{label}</Text>
      )}
    </Pressable>
  )
}
