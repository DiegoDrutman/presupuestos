import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Card } from "../layout/Card"
import { colors } from "../../constants/colors"
import { spacing } from "../../constants/spacing"

type Props = {
  total: number
  onShare: () => void
}

export function BudgetSummary({ total, onShare }: Props) {
  return (
    <Card>
      <View>
        <Text style={styles.totalTexto}>TOTAL: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.botonPrincipal} onPress={onShare}>
          <Text style={styles.botonPrincipalTexto}>
            Compartir presupuesto
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    alignItems: "center",
  },
  botonPrincipal: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  botonPrincipalTexto: {
    color: "white",
    fontWeight: "600",
  },
})
