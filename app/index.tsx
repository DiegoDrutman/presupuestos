import React from "react"
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native"
import { Screen } from "../components/layout/Screen"
import { Header } from "../components/budget/Header"
import { BudgetHeaderForm } from "../components/budget/BudgetHeaderForm"
import { BudgetProcess } from "../components/budget/BudgetProcess"
import { BudgetLaborCost } from "../components/budget/BudgetLaborCost"
import { BudgetSummary } from "../components/budget/BudgetSummary"
import { BudgetMaterials } from "../components/budget/BudgetMaterials" // 👈 NUEVO
import { useBudget } from "../hooks/useBudget"

export default function Index() {
  const {
    budget,
    totalFinal,
    updateCliente,
    updateCuil,          // 👈 AGREGADO
    updateFecha,
    updateProceso,
    updateManoDeObra,
    updateMateriales,    // 👈 AGREGADO
    shareBudget,
  } = useBudget()

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header />

          <BudgetHeaderForm
            cliente={budget.cliente}
            cuil={budget.cuil}              // 👈 ahora pasa cuil
            fecha={budget.fecha}
            onChangeCliente={updateCliente}
            onChangeCuil={updateCuil}
            onChangeFecha={updateFecha}
          />

          <BudgetProcess
            proceso={budget.proceso}
            onChangeProceso={updateProceso}
          />

          <BudgetMaterials
            materiales={budget.materiales}
            onChangeMateriales={updateMateriales}
          />

          <BudgetLaborCost
            manoDeObra={budget.manoDeObra}
            onChangeManoDeObra={updateManoDeObra}
          />

          <BudgetSummary total={totalFinal} onShare={shareBudget} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
}
