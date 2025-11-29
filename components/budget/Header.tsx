import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../../constants/colors"
import { Card } from "../layout/Card"

export function Header() {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        {/* LOGO */}
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/images/logo.png")}
            resizeMode="contain"
            style={styles.logoImg}
          />
        </View>

        {/* TITULOS IZQUIERDA */}
        <View style={styles.left}>
          <Text style={styles.titulo}>INSTALACIONES THERMOSANITARIAS</Text>
          <Text style={styles.subtitulo}>de Roberto Guidotti</Text>
        </View>
      </View>

      {/* FRANJA INFERIOR */}
      <View style={styles.strip} />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    marginRight: 16,
    marginTop: -10,
    borderRadius: 4,
    overflow: "hidden",
  },

  logoImg: {
    width: "100%",
    height: "100%",
  },

  left: {
    flex: 1,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  subtitulo: {
    fontSize: 14,
    marginTop: 2,
    color: colors.textPrimary,
  },

  listText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#004a7c",
  },

  strip: {
    marginTop: 6,
    height: 3,
    borderRadius: 2,
    marginHorizontal: 12,
    backgroundColor: "transparent",
    overflow: "hidden",

    // Degradado simulado (React Native no soporta CSS gradients)
    // Si usas expo-linear-gradient lo metemos posta
  },
})
