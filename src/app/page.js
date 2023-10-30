"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import styles from "./page.module.scss"
import Header from "./components/Header/Header"
import Stockes from "./components/Stockes/Stockes"
import StockDetails from "./components/Stockdetails/Stockdetails"

export default function Home() {
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
        <Header />
        {/* <Stockes /> */}
        <StockDetails />
      </main>
    </QueryClientProvider>
  )
}
