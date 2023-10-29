import styles from "./page.module.scss"
import Header from "./components/Header/Header"
import Stockes from "./components/Stockes/Stockes"
import StockDetails from "./components/Stockdetails/Stockdetails"

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      {/* <Stockes /> */}
      <StockDetails />
    </main>
  )
}
