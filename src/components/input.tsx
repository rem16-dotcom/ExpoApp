import { Ref, useState } from 'react'
import { Pressable, Text, TextInput, TextInputProps, TextStyle, View } from 'react-native'
import { Eye, EyeOff, LucideIcon } from 'lucide-react-native'
import { useTheme } from '@/src/context/theme'

interface InputProps extends TextInputProps {
    label: string
    icon?: LucideIcon
    error?: string
    /** Password field with a show/hide toggle. */
    secure?: boolean
    ref?: Ref<TextInput>
}

const noOutline = { outlineStyle: 'none' } as unknown as TextStyle

export default function Input({ label, icon: Icon, error, secure, style, onFocus, onBlur, ...props }: InputProps) {
    const { c } = useTheme()
    const [hidden, setHidden] = useState(!!secure)
    const [focused, setFocused] = useState(false)
    const borderColor = error ? c.danger : focused ? c.accent : c.border

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6, marginLeft: 4, fontSize: 13, fontWeight: '600', color: c.text }}>{label}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 16,
                    borderWidth: 1.5,
                    borderColor,
                    backgroundColor: c.surface,
                    paddingHorizontal: 16,
                }}
            >
                {Icon ? <Icon size={19} color={focused ? c.accent : c.muted} /> : null}
                <TextInput
                    {...props}
                    secureTextEntry={secure ? hidden : props.secureTextEntry}
                    placeholderTextColor={c.placeholder}
                    onFocus={(e) => {
                        setFocused(true)
                        onFocus?.(e)
                    }}
                    onBlur={(e) => {
                        setFocused(false)
                        onBlur?.(e)
                    }}
                    style={[noOutline, { flex: 1, marginLeft: Icon ? 12 : 0, paddingVertical: 14, fontSize: 15, color: c.text }, style]}
                />
                {secure ? (
                    <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
                        {hidden ? <Eye size={20} color={c.muted} /> : <EyeOff size={20} color={c.muted} />}
                    </Pressable>
                ) : null}
            </View>
            {error ? <Text style={{ marginLeft: 4, marginTop: 4, fontSize: 12, color: c.danger }}>{error}</Text> : null}
        </View>
    )
}
