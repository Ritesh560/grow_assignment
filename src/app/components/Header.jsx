import React from "react"
import SearchBar from "../../../libs/widgets/SearchBar/SearchBar"
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.title}>GrowwStonks</div>
      <div className={styles.searchbar}>
        <SearchBar />
      </div>
    </div>
  )
}

export default Header
