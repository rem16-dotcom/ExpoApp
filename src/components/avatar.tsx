import { useState } from 'react'
import { Text, View } from 'react-native'
import { Image, ImageSource } from 'expo-image'
import { useTheme } from '@/src/context/theme'

type Props = { source?: ImageSource; name: string; size?: number }

/** Profile picture (a local file or a link) with a first-letter fallback when there is no picture. */
export default function Avatar({ source, name, size = 40 }: Props) {
  const { c } = useTheme()
  const [failed, setFailed] = useState(false)
  const dim = { width: size, height: size, borderRadius: size / 2 }

  if (!source || failed) {
    return (
      <View style={[dim, { alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }]}>
        <Text style={{ fontSize: size * 0.42, fontWeight: '800', color: c.accent }}>
          {name.trim().charAt(0).toUpperCase() || '?'}
        </Text>
      </View>
    )
  }

  return (
    <Image
      source={source}
      style={[dim, { backgroundColor: c.surface2 }]}
      contentFit="cover"
      onError={() => setFailed(true)}
    />
  )
}
