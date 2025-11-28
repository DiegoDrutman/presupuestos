import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { Card } from "../layout/Card"
import { colors } from "../../constants/colors"
import { spacing } from "../../constants/spacing"

type Props = {
  manoDeObra: number
  onChangeManoDeObra: (value: number) => void
}

export function BudgetLaborCost({ manoDeObra, onChangeManoDeObra }: Props) {
  const handleChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, "")
    const num = cleaned === "" ? 0 : Number(cleaned)
    onChangeManoDeObra(num)
  }

  return (
    <Card>
      <View>
        <Text style={styles.titulo}>Mano de obra</Text>

        <View style={styles.inputWithSymbol}>
          <Text style={styles.symbol}>$</Text>
          <TextInput
            style={styles.inputInner}
            value={manoDeObra === 0 ? "" : String(manoDeObra)}
            onChangeText={handleChange}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.textMuted}
          />
        </View>
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
  inputWithSymbol: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: spacing.sm,
  },
  symbol: {
    fontSize: 16,
    color: colors.textMuted,
    marginRight: 4,
  },
  inputInner: {
    flex: 1,
    paddingVertical: 6,
  },
})
