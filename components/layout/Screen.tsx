import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { colors } from "../../constants/colors"
import { spacing } from "../../constants/spacing"

type Props = {
  children: React.ReactNode
}

export function Screen({ children }: Props) {
  return <ScrollView style={styles.container}>{children}</ScrollView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
})
