"use client"
import { useEffect } from "react"
import styles from "./SearchBar.module.scss"

// import { Close, Search } from "@ro-email-ticketing/icons"

const SearchBar = ({ value, setValue, width = "100%", height, onSearch, className, onEnter, searbarRef = { current: null }, onSearchEmpty, placeholder = "Search", ...rest }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value?.length > 0 && typeof onSearch === "function") {
        onSearch(value)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={`${styles.searchBarContainer} ${className ?? ""}`} style={{ width: width, height: height }} ref={searbarRef}>
      <div className={styles.searchIcon}>{/* <Search /> */}s</div>
      <div className={styles.searchInput}>
        <input type="text" className={styles.inputField} placeholder="Search stoks & etfs" />
        {value && (
          <span className={`${styles.closeIcon} ${value && styles.closeIconActive}`}>
            {/* <Close
              size="1.5rem"
              color="black"
              onClick={() => {
                if (onSearchEmpty && typeof onSearchEmpty === "function") onSearchEmpty()
              }}
            /> */}
            X
          </span>
        )}
      </div>
    </div>
  )
}

export default SearchBar
