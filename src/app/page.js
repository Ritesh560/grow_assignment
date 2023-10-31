"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import styles from "./page.module.scss"
import Header from "./components/Header/Header"
import Stockes from "./components/Stockes/Stockes"
import StockDetails from "./components/Stockdetails/Stockdetails"
import { useState } from "react"

export default function Home() {
  const [selectedStock, setSelectedStock] = useState({})

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.main}>
        <Header selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
        <Stockes selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
      </main>
    </QueryClientProvider>
  )
}
