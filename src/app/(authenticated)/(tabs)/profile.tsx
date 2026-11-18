import { useState } from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { AtSign, Calendar, LogOut, LucideIcon, Mail, MapPin, MessageSquareText, Moon, Pencil, Sun, User } from 'lucide-react-native'
import Avatar from '@/src/components/avatar'
import Input from '@/src/components/input'
import { useTheme } from '@/src/context/theme'
import { useUser } from '@/src/context/user'

type Row = { icon: LucideIcon; label: string; value: string }
type Form = { name: string; username: string; location: string; bio: string }
type Errors = { name?: string; username?: string }

export default function Profile() {
  const { c, dark, toggle } = useTheme()
  const { user, logout, updateProfile } = useUser()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<Form>({ name: '', username: '', location: '', bio: '' })
  const [errors, setErrors] = useState<Errors>({})

  if (!user) return null

  const joined = new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  const rows: Row[] = [
    { icon: AtSign, label: 'Username', value: user.username },
    { icon: Mail, label: 'Email', value: user.email },
    { icon: MapPin, label: 'Location', value: user.location || 'Not set' },
    { icon: Calendar, label: 'Joined', value: joined },
  ]

  const openEdit = () => {
    setForm({ name: user.name, username: user.username, location: user.location, bio: user.bio })
    setErrors({})
    setEditing(true)
  }

  const save = () => {
    const username = form.username.trim().replace(/^@/, '')
    const next: Errors = {}
    if (form.name.trim().length < 2) next.name = 'Enter your name.'
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) next.username = '3-20 letters, numbers or underscores.'
    setErrors(next)
    if (next.name || next.username) return
    updateProfile({ ...form, username })
    setEditing(false)
  }

  const logOut = () => {
    router.replace('/login')
    logout()
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Cover */}
        <View style={{ height: 150, overflow: 'hidden', backgroundColor: c.surface }}>
          <View style={{ position: 'absolute', right: -40, top: -50, height: 190, width: 190, borderRadius: 95, backgroundColor: c.accent, opacity: 0.35 }} />
          <View style={{ position: 'absolute', left: -50, top: 60, height: 150, width: 150, borderRadius: 75, backgroundColor: c.accent, opacity: 0.18 }} />
        </View>

        <View style={{ alignItems: 'center', paddingHorizontal: 24 }}>
          <View style={{ marginTop: -56, borderRadius: 60, backgroundColor: c.bg, padding: 5 }}>
            <Avatar source={user.avatar} name={user.name} size={104} />
          </View>
          <Text style={{ marginTop: 12, fontSize: 26, fontWeight: '800', color: c.text }}>{user.name}</Text>
          <Text style={{ marginTop: 2, fontSize: 15, fontWeight: '600', color: c.accent }}>@{user.username}</Text>
          <Text style={{ marginTop: 12, textAlign: 'center', fontSize: 15, lineHeight: 21, color: user.bio ? c.text : c.muted }}>
            {user.bio || 'No bio yet. Tell people a little about you.'}
          </Text>

          <Pressable
            onPress={openEdit}
            style={({ pressed }) => ({
              marginTop: 18, flexDirection: 'row', alignItems: 'center', borderRadius: 24,
              backgroundColor: c.accent, paddingHorizontal: 24, paddingVertical: 12, opacity: pressed ? 0.85 : 1,
            })}
          >
            <Pencil size={18} color={c.onAccent} />
            <Text style={{ marginLeft: 8, fontSize: 15, fontWeight: '800', color: c.onAccent }}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Personal details */}
        <View style={{ marginHorizontal: 16, marginTop: 26, borderRadius: 24, backgroundColor: c.surface, paddingHorizontal: 18, paddingVertical: 4 }}>
          {rows.map((row, i) => (
            <View
              key={row.label}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderTopWidth: i > 0 ? 1 : 0, borderTopColor: c.border }}
            >
              <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: c.surface2 }}>
                <row.icon size={20} color={c.accent} />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ fontSize: 12, color: c.muted }}>{row.label}</Text>
                <Text style={{ marginTop: 2, fontSize: 15, fontWeight: '600', color: c.text }}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Dark mode + log out */}
        <View style={{ marginHorizontal: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center', borderRadius: 24, backgroundColor: c.surface, paddingHorizontal: 18, paddingVertical: 12 }}>
          <View style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: c.surface2 }}>
            {dark ? <Moon size={20} color={c.accent} /> : <Sun size={20} color={c.accent} />}
          </View>
          <Text style={{ marginLeft: 12, flex: 1, fontSize: 15, fontWeight: '600', color: c.text }}>Dark mode</Text>
          <Switch value={dark} onValueChange={toggle} trackColor={{ false: c.border, true: c.accent }} thumbColor="#fff" />
        </View>

        <Pressable
          onPress={logOut}
          style={({ pressed }) => ({
            marginHorizontal: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            borderRadius: 24, borderWidth: 1.5, borderColor: c.border, paddingVertical: 14, opacity: pressed ? 0.7 : 1,
          })}
        >
          <LogOut size={20} color={c.text} />
          <Text style={{ marginLeft: 8, fontSize: 15, fontWeight: '700', color: c.text }}>Log out</Text>
        </Pressable>
      </ScrollView>

      {/* Edit profile sheet */}
      <Modal visible={editing} animationType="slide" onRequestClose={() => setEditing(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: c.border, paddingHorizontal: 16, paddingVertical: 12 }}>
            <Pressable onPress={() => setEditing(false)} hitSlop={10}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: c.muted }}>Cancel</Text>
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: '800', color: c.text }}>Edit Profile</Text>
            <Pressable onPress={save} hitSlop={10}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: c.accent }}>Save</Text>
            </Pressable>
          </View>

          <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20 }}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Avatar source={user.avatar} name={form.name || user.name} size={84} />
              </View>
              <Input
                label="Name"
                icon={User}
                value={form.name}
                onChangeText={(name) => setForm((f) => ({ ...f, name }))}
                error={errors.name}
                autoCapitalize="words"
              />
              <Input
                label="Username"
                icon={AtSign}
                value={form.username}
                onChangeText={(username) => setForm((f) => ({ ...f, username }))}
                error={errors.username}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                label="Location"
                icon={MapPin}
                placeholder="City, Country"
                value={form.location}
                onChangeText={(location) => setForm((f) => ({ ...f, location }))}
              />
              <Input
                label="Bio"
                icon={MessageSquareText}
                placeholder="Tell people a little about you"
                value={form.bio}
                onChangeText={(bio) => setForm((f) => ({ ...f, bio }))}
                multiline
                maxLength={120}
                style={{ minHeight: 72, textAlignVertical: 'top' }}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </View>
  )
}
