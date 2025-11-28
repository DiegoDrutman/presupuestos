import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { colors } from "../../constants/colors"
import { spacing } from "../../constants/spacing"

type Props = {
  children: React.ReactNode
  style?: ViewStyle
}

export function Card({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
  },
})
