import { Asset } from "expo-asset"
import * as FileSystem from "expo-file-system/legacy"
import * as Sharing from "expo-sharing"
import { useState } from "react"
import { Alert } from "react-native"

const pdfMake = require("pdfmake/build/pdfmake")
const pdfFonts = require("pdfmake/build/vfs_fonts")

// Configurar fuentes VFS
if ((pdfFonts as any).pdfMake && (pdfFonts as any).pdfMake.vfs) {
  ;(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs
} else if ((pdfFonts as any).vfs) {
  ;(pdfMake as any).vfs = (pdfFonts as any).vfs
}

;(pdfMake as any).fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
}

// ----------------------------
// TYPES
// ----------------------------

// Lo dejo por compatibilidad si algún archivo todavía importa BudgetItem,
// pero ya no lo usamos más en el estado.
export type BudgetItem = {
  id: string
  descripcion: string
  cantidad: number
  precioUnitario: number
}

export type Budget = {
  cliente: string
  cuil: string
  fecha: string
  proceso: string
  materiales: number   // 💰 monto total de materiales
  manoDeObra: number   // 💰 monto total de mano de obra
}

// ----------------------------
// HOOK PRINCIPAL
// ----------------------------

export function useBudget() {
  const [budget, setBudget] = useState<Budget>({
    cliente: "",
    cuil: "",
    fecha: "",
    proceso: "",
    materiales: 0,
    manoDeObra: 0,
  })

  // Subtotal = materiales
  const subtotal = budget.materiales

  // Total final = materiales + mano de obra
  const totalFinal = budget.materiales + budget.manoDeObra

  // ----------------------------
  // UPDATE FUNCTIONS
  // ----------------------------

  const updateCliente = (cliente: string) =>
    setBudget(prev => ({ ...prev, cliente }))

  const updateCuil = (cuil: string) =>
    setBudget(prev => ({ ...prev, cuil }))

  const updateFecha = (fecha: string) =>
    setBudget(prev => ({ ...prev, fecha }))

  const updateProceso = (proceso: string) =>
    setBudget(prev => ({ ...prev, proceso }))

  const updateMateriales = (materiales: number) =>
    setBudget(prev => ({ ...prev, materiales }))

  const updateManoDeObra = (manoDeObra: number) =>
    setBudget(prev => ({ ...prev, manoDeObra }))

  // ----------------------------
  // GENERAR LOGO
  // ----------------------------

  async function getLogoBase64() {
    const asset = Asset.fromModule(require("../assets/images/logo.png"))
    await asset.downloadAsync()

    const uri = asset.localUri || asset.uri
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64" as any,
    })

    return `data:image/jpeg;base64,${base64}`
  }

  // ----------------------------
  // GENERAR Y COMPARTIR PDF
  // ----------------------------

  const shareBudget = async () => {
    const clienteValido = budget.cliente.trim().length > 0
    const cuilValido = budget.cuil.trim().length > 0
    const fechaValida = budget.fecha.trim().length === 10

    if (!clienteValido || !cuilValido || !fechaValida) {
      Alert.alert(
        "Campos incompletos",
        "Completá cliente, CUIL/CUIT y la fecha (dd/mm/aaaa) antes de continuar."
      )
      return
    }

    try {
      const logoBase64 = await getLogoBase64()

      const nombreCliente = budget.cliente.trim().replace(/\s+/g, "-")
      const fechaFile = budget.fecha.trim().replace(/\//g, "-")
      const baseName = `${nombreCliente}_${fechaFile}`

      const cacheDir = (FileSystem as any).cacheDirectory as
        | string
        | undefined
      const fileUri = (cacheDir || "") + (baseName || "presupuesto") + ".pdf"

      const docDefinition: any = {
        pageSize: "A4",
        pageMargins: [32, 120, 32, 90],

        header: () => ({
          margin: [24, 20, 24, 0],
          stack: [
            {
              columns: [
                { image: logoBase64, width: 70, margin: [0, 0, 12, 0] },
                {
                  stack: [
                    {
                      text: "INSTALACIONES THERMOSANITARIAS",
                      style: "headerMain",
                    },
                    {
                      text: "de Roberto Guidotti",
                      style: "headerSub",
                    },
                  ],
                },
                {
                  alignment: "right",
                  width: "40%",
                  stack: [
                    {
                      text: "AGUA · GAS · CALEFACCIÓN · CLOACAS · PLUVIALES",
                      fontSize: 9,
                      bold: true,
                      color: "#004a7c",
                    },
                    {
                      text: "VAPOR · AIRE COMPRIMIDO · PLANOS Y TRÁMITES",
                      fontSize: 9,
                      bold: true,
                      color: "#004a7c",
                    },
                    {
                      text: "INDUSTRIALES · COMERCIALES · DOMICILIARIAS",
                      fontSize: 9,
                      bold: true,
                      color: "#004a7c",
                    },
                  ],
                },
              ],
            },
          ],
        }),

        footer: (currentPage: number, pageCount: number) => ({
          margin: [24, 0, 24, 8],
          stack: [
            {
              text: "Rossini 2171 · Hurlingham · Tel. 4665-3259 · Cel. 15-5499-0234",
              alignment: "center",
              fontSize: 9,
              bold: true,
              color: "#004a7c",
            },
            {
              text: "guidottiram@gmail.com",
              alignment: "center",
              fontSize: 9,
              color: "#111827",
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              alignment: "right",
              fontSize: 8,
              color: "#6b7280",
            },
          ],
        }),

        content: [
          // Datos base
          {
            margin: [0, 0, 0, 14],
            columns: [
              {
                width: "40%",
                stack: [
                  { text: "Cliente", style: "sectionTitle" },
                  { text: budget.cliente || "-", style: "sectionText" },
                ],
              },
              {
                width: "30%",
                stack: [
                  { text: "CUIL / CUIT", style: "sectionTitle" },
                  { text: budget.cuil || "-", style: "sectionText" },
                ],
              },
              {
                width: "30%",
                stack: [
                  { text: "Fecha", style: "sectionTitle" },
                  { text: budget.fecha || "-", style: "sectionText" },
                ],
              },
            ],
          },

          // Proceso del trabajo
          {
            text: "Proceso del trabajo",
            style: "sectionTitle",
            margin: [0, 6, 0, 2],
          },
          {
            text: budget.proceso || "—",
            style: "sectionText",
            margin: [0, 0, 0, 14],
          },

          // Montos
          {
            margin: [0, 8, 0, 4],
            table: {
              headerRows: 1,
              widths: ["*", "auto"],
              body: [
                [
                  { text: "Concepto", style: "tableHeader" },
                  { text: "Importe", style: "tableHeader", alignment: "right" },
                ],
                [
                  { text: "Materiales", style: "sectionText" },
                  {
                    text: `$ ${budget.materiales.toFixed(2)}`,
                    alignment: "right",
                  },
                ],
                [
                  { text: "Mano de obra", style: "sectionText" },
                  {
                    text: `$ ${budget.manoDeObra.toFixed(2)}`,
                    alignment: "right",
                  },
                ],
              ],
            },
            layout: {
              hLineColor: "#e5e7eb",
              vLineColor: "#e5e7eb",
            },
          },

          // Total final
          {
            text: `TOTAL FINAL: $ ${totalFinal.toFixed(2)}`,
            style: "total",
            alignment: "right",
            margin: [0, 12, 0, 0],
          },
        ],

        styles: {
          headerMain: { fontSize: 18, bold: true, color: "#111827" },
          headerSub: { fontSize: 11, margin: [0, 2, 0, 0] },
          sectionTitle: { fontSize: 13, bold: true, margin: [0, 0, 0, 4] },
          sectionText: { fontSize: 12, margin: [0, 0, 0, 8] },
          tableHeader: { bold: true, fontSize: 12, color: "#111827" },
          total: { fontSize: 16, bold: true },
        },
        defaultStyle: { fontSize: 11 },
      }

      const base64Pdf: string = await new Promise((resolve, reject) => {
        try {
          const pdfDocGenerator = (pdfMake as any).createPdf(docDefinition)
          pdfDocGenerator.getBase64((data: string) => resolve(data))
        } catch (error) {
          reject(error)
        }
      })

      await FileSystem.writeAsStringAsync(fileUri, base64Pdf, {
        encoding: (FileSystem as any).EncodingType.Base64,
      })

      const available = await Sharing.isAvailableAsync()
      if (!available) return

      await Sharing.shareAsync(fileUri, {
        mimeType: "application/pdf",
        dialogTitle: "Compartir presupuesto",
        UTI: "com.adobe.pdf",
      })
    } catch (error) {
      console.error("Error al generar PDF:", error)
      Alert.alert("Error", "Ocurrió un error al generar el PDF.")
    }
  }

  // ----------------------------
  // RETURN
  // ----------------------------

  return {
    budget,
    subtotal,
    totalFinal,
    updateCliente,
    updateCuil,
    updateFecha,
    updateProceso,
    updateMateriales,
    updateManoDeObra,
    shareBudget,
  }
}
