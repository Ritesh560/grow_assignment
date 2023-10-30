import React from "react"
import SearchBar from "../../../../libs/widgets/SearchBar/SearchBar"
import styles from "./Header.module.scss"
import TrendUp from "../../../../libs/icons/trend_up.svg"
import Image from "next/image"

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>
        GrowwStonks <Image src={TrendUp} alt="Trend up" width={20} height={20} />
      </div>
      <div className={styles.searchbar}>
        <SearchBar />
      </div>
    </div>
  )
}

export default Header
