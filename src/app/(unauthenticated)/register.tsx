import { useRef, useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { Link, router } from 'expo-router'
import { Lock, Mail, ShieldCheck, User } from 'lucide-react-native'
import AuthShell from '@/src/components/auth-shell'
import Button from '@/src/components/button'
import Input from '@/src/components/input'
import { useTheme } from '@/src/context/theme'
import { useUser } from '@/src/context/user'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = { name?: string; email?: string; password?: string; confirm?: string }

export default function Register() {
  const { c } = useTheme()
  const { register } = useUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)
  const confirmRef = useRef<TextInput>(null)

  const submit = () => {
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Enter your name.'
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.'
    if (password.length < 6) next.password = 'Use at least 6 characters.'
    if (confirm !== password) next.confirm = "Passwords don't match."
    setErrors(next)
    if (Object.keys(next).length) return
    register(name, email)
    router.replace('/home')
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Hunnypie and start sharing."
      footer={
        <>
          <Text style={{ fontSize: 14, color: c.muted }}>Already have an account? </Text>
          <Link href="/login" style={{ color: c.accent, fontWeight: '800', fontSize: 14 }}>
            Log in
          </Link>
        </>
      }
    >
      <Input
        label="Name"
        icon={User}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        error={errors.name}
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
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
        ref={emailRef}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <Input
        label="Password"
        icon={Lock}
        placeholder="At least 6 characters"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        secure
        autoCapitalize="none"
        returnKeyType="next"
        ref={passwordRef}
        onSubmitEditing={() => confirmRef.current?.focus()}
      />
      <Input
        label="Confirm password"
        icon={ShieldCheck}
        placeholder="Type it again"
        value={confirm}
        onChangeText={setConfirm}
        error={errors.confirm}
        secure
        autoCapitalize="none"
        returnKeyType="go"
        ref={confirmRef}
        onSubmitEditing={submit}
      />

      <View className="mt-2">
        <Button label="Register" onPress={submit} />
      </View>
    </AuthShell>
  )
}
