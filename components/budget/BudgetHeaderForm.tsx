import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Card } from "../layout/Card"
import { colors } from "../../constants/colors"
import { spacing } from "../../constants/spacing"

type Props = {
  cliente: string
  cuil: string
  fecha: string
  onChangeCliente: (value: string) => void
  onChangeCuil: (value: string) => void
  onChangeFecha: (value: string) => void
}

export function BudgetHeaderForm({
  cliente,
  cuil,
  fecha,
  onChangeCliente,
  onChangeCuil,
  onChangeFecha,
}: Props) {
  const handleFechaChange = (value: string) => {
    let cleaned = value.replace(/\D/g, "")

    if (cleaned.length > 2 && cleaned.length <= 4) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
    } else if (cleaned.length > 4) {
      cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
        4,
        8
      )}`
    }

    onChangeFecha(cleaned)
  }

  return (
    <Card>
      <View>
        <Text style={styles.titulo}>Datos</Text>

        <Text style={styles.label}>Cliente</Text>
        <TextInput
          style={styles.input}
          value={cliente}
          onChangeText={onChangeCliente}
          placeholder="Nombre del cliente"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>CUIL / CUIT</Text>
        <TextInput
          style={styles.input}
          value={cuil}
          onChangeText={onChangeCuil}
          placeholder="CUIL / CUIT"
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />

        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={handleFechaChange}
          maxLength={10}
          placeholder="dd/mm/aaaa"
          keyboardType="numeric"
          placeholderTextColor={colors.textMuted}
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    marginBottom: spacing.sm,
    backgroundColor: "white",
  },
})
