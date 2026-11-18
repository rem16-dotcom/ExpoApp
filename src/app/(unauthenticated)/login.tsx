import { useRef, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Link, router } from 'expo-router'
import { Lock, Mail } from 'lucide-react-native'
import AuthShell from '@/src/components/auth-shell'
import Button from '@/src/components/button'
import Input from '@/src/components/input'
import { useTheme } from '@/src/context/theme'
import { useUser } from '@/src/context/user'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = { email?: string; password?: string }

export default function Login() {
  const { c } = useTheme()
  const { login } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const passwordRef = useRef<TextInput>(null)

  const submit = () => {
    const next: Errors = {}
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Enter your password.'
    setErrors(next)
    if (next.email || next.password) return
    login(email)
    router.replace('/home')
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to see what everyone is sharing."
      footer={
        <>
          <Text style={{ fontSize: 14, color: c.muted }}>New to Hunnypie? </Text>
          <Link href="/register" style={{ color: c.accent, fontWeight: '800', fontSize: 14 }}>
            Register
          </Link>
        </>
      }
    >
      <Input
        label="Email"
        icon={Mail}
        placeholder="you@example.com"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <Input
        label="Password"
        icon={Lock}
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secure
        autoCapitalize="none"
        returnKeyType="go"
        ref={passwordRef}
        onSubmitEditing={submit}
      />

      <View className="mt-2">
        <Button label="Log in" onPress={submit} />
      </View>
    </AuthShell>
  )
}
