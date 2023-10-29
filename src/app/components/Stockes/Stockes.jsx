"use client"
import React, { useState } from "react"

import styles from "./Stockes.module.scss"

const Stockes = () => {
  const [activeTab, setActiveTab] = useState(0)
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
        <div className={styles.card}>
          <div className={styles.icon}></div>
          <div className={styles.title}>Title</div>
          <div className={styles.stats}>
            <div className={styles.price}>$177.15</div>
            <div className={styles.gain}>45%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stockes
