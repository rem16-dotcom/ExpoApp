import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Heart, Moon, Sun } from 'lucide-react-native'
import PostCard from '@/src/components/post-card'
import { useTheme } from '@/src/context/theme'
import { POSTS } from '@/src/data/mock'

export default function Home() {
  const { c, dark, toggle } = useTheme()

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: c.bg }}>
      {/* Header: logo + dark mode toggle */}
      <View
        style={{
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          paddingHorizontal: 16, paddingTop: 4, paddingBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Heart size={28} color={c.accent} fill={c.accent} />
          <Text style={{ marginLeft: 6, fontSize: 30, fontWeight: '800', color: c.text, letterSpacing: -1 }}>
            Hunnypie
          </Text>
        </View>
        <Pressable onPress={toggle} hitSlop={8} accessibilityLabel="Toggle dark mode" style={{ padding: 6 }}>
          {dark ? <Sun size={26} color={c.text} /> : <Moon size={26} color={c.text} />}
        </Pressable>
      </View>

      {/* Scrollable feed */}
      <FlatList
        data={POSTS}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 6, paddingBottom: 130 }}
      />
    </SafeAreaView>
  )
}
