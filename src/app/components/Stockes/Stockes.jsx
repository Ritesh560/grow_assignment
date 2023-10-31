"use client"
import React, { useState } from "react"

import styles from "./Stockes.module.scss"
import useStocks from "../../../../libs/data-access/useStocks"
import Image from "next/image"
import upArrow from "../../../../libs/assets/icons/up_arrow.svg"
import downArrow from "../../../../libs/assets/icons/down_arrow.svg"
import generalStock from "../../../../libs/assets/icons/general_stock.png"
import StockDetails from "../Stockdetails/Stockdetails"

const Stockes = ({ selectedStock, setSelectedStock }) => {
  const [activeTab, setActiveTab] = useState(0)
  const { topStocks } = useStocks({})

  return (
    <div className={styles.stocks}>
      {!selectedStock?.ticker ? (
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
            {(activeTab == 0 ? topStocks?.data?.top_gainers : topStocks?.data?.top_losers)?.map((gainer, i) => (
              <div className={styles.card} key={`top_gainer_looser${i}`} onClick={() => setSelectedStock(gainer)}>
                <Image src={generalStock} alt="general stock" className={styles.icon} />
                <div className={styles.title}>{gainer?.ticker}</div>
                <div className={styles.stats}>
                  <div className={styles.price}>${gainer?.price}</div>
                  <div className={activeTab == 0 ? styles.gain : styles.lose}>
                    {gainer?.change_percentage} <span> {activeTab == 0 ? <Image src={upArrow} alt="Up arrow" width={10} height={10} /> : <Image src={downArrow} alt="down arrow" width={10} height={10} className={styles.downArrow} />}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <StockDetails selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
      )}
    </div>
  )
}

export default Stockes
