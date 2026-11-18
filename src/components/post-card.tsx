import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from 'lucide-react-native'
import Avatar from '@/src/components/avatar'
import { useTheme } from '@/src/context/theme'
import type { Post } from '@/src/data/mock'

/** One post in the feed: profile picture, username, text, image and action row. */
export default function PostCard({ post }: { post: Post }) {
  const { c } = useTheme()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <View
      style={{
        marginHorizontal: 12, marginBottom: 16, borderRadius: 28, backgroundColor: c.surface,
        paddingTop: 14, paddingBottom: 12, overflow: 'hidden',
      }}
    >
      {/* Author */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
        <Avatar source={post.user.avatar} name={post.user.name} size={42} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '800', color: c.text }}>{post.user.name}</Text>
          <Text numberOfLines={1} style={{ marginTop: 1, fontSize: 12, color: c.muted }}>
            @{post.user.username} · {post.time}
          </Text>
        </View>
        <Pressable hitSlop={10} accessibilityLabel="More options">
          <Ellipsis size={22} color={c.text} />
        </Pressable>
      </View>

      {/* Text */}
      <Text style={{ marginTop: 12, paddingHorizontal: 14, fontSize: 15, lineHeight: 21, color: c.text }}>
        {post.text}
      </Text>

      {/* Image */}
      {post.image ? (
        <Image
          source={post.image}
          style={{ marginTop: 12, marginHorizontal: 10, aspectRatio: 4 / 3, borderRadius: 22, backgroundColor: c.surface2 }}
          contentFit="cover"
          transition={250}
        />
      ) : null}

      {/* Actions */}
      <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
        <Pressable
          onPress={() => setLiked((v) => !v)}
          hitSlop={8}
          style={{ flexDirection: 'row', alignItems: 'center' }}
          accessibilityLabel="Like"
        >
          <Heart size={24} color={liked ? c.accent : c.text} fill={liked ? c.accent : 'transparent'} />
          <Text style={{ marginLeft: 6, fontSize: 13, fontWeight: '700', color: liked ? c.accent : c.text }}>
            {post.likes + (liked ? 1 : 0)}
          </Text>
        </Pressable>

        <View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
          <MessageCircle size={23} color={c.text} />
          <Text style={{ marginLeft: 6, fontSize: 13, fontWeight: '700', color: c.text }}>{post.comments}</Text>
        </View>

        <View style={{ marginLeft: 20 }}>
          <Send size={22} color={c.text} />
        </View>

        <View style={{ flex: 1 }} />

        <Pressable onPress={() => setSaved((v) => !v)} hitSlop={8} accessibilityLabel="Save">
          <Bookmark size={23} color={saved ? c.accent : c.text} fill={saved ? c.accent : 'transparent'} />
        </Pressable>
      </View>
    </View>
  )
}
