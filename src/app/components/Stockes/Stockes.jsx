"use client"
import React, { useEffect, useState } from "react"

import styles from "./Stockes.module.scss"
import useStocks from "../../../../libs/data-access/useStocks"

const Stockes = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { topGainers } = useStocks()

  useEffect(() => {
    console.log("gainers", topGainers?.data)
  }, [topGainers])

  return (
    <div className={styles.stocksContainer}>
      <div className={styles.tabs}>
        <div className={styles.tab + " " + (activeTab === 0 && styles.active)} onClick={() => setActiveTab(0)}>
          Top Gainers
        </div>
        <div className={styles.tab + " " + (activeTab === 1 && styles.active)} onClick={() => setActiveTab(1)}>
          Top Losers
        </div>
      </div>
      <div className={styles.cards}>
        {(activeTab == 0 ? topGainers?.data?.top_gainers : topGainers?.data?.top_losers)?.map((gainer, i) => (
          <div className={styles.card} key={`top_gainer_looser${i}`}>
            <div className={styles.icon}></div>
            <div className={styles.title}>{gainer?.ticker}</div>
            <div className={styles.stats}>
              <div className={styles.price}>${gainer?.price}</div>
              <div className={styles.gain}>{gainer?.change_percentage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stockes
