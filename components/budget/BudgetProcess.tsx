import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Card } from "../layout/Card"
import { colors } from "../../constants/colors"
import { spacing } from "../../constants/spacing"

type Props = {
  proceso: string
  onChangeProceso: (value: string) => void
}

export function BudgetProcess({ proceso, onChangeProceso }: Props) {
  return (
    <Card>
      <View>
        <Text style={styles.titulo}>Detalle del trabajo</Text>
        <TextInput
          style={styles.textarea}
          value={proceso}
          onChangeText={onChangeProceso}
          placeholder="Ej: Se realizará la instalación en dos etapas..."
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  textarea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 100,
    backgroundColor: "white",
  },
})
