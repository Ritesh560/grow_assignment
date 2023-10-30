import React from "react"
import styles from "./Stockdetails.module.scss"
import Image from "next/image"
import generalStock from "../../../../libs/assets/icons/general_stock.png"
import useStocks from "../../../../libs/data-access/useStocks"

function StockDetails() {
  const { stockDetails } = useStocks({ symbol: "IBM" })
  console.log(stockDetails)

  return (
    <div className={styles.stockDetails}>
      <div className={styles.header}>
        <Image src={generalStock} alt="general stock" className={styles.icon} />
        <div className={styles.details}>
          <p className={styles.title}>{stockDetails?.data?.Symbol}</p>
          <p>{stockDetails?.data?.AssetType}</p>
          <p>{stockDetails?.data?.Name}</p>
        </div>
        <div className={styles.price}>
          <p>$177.15</p>
          <p className={styles.gain}>+45%</p>
        </div>
      </div>
      <div className={styles.graph}></div>
      <div className={styles.description}>
        <h2>About {stockDetails?.data?.Name}</h2>
        <div className={styles.seperator}></div>
        <div className={styles.desc}>
          <p className={styles.text}>{stockDetails?.data?.Description}</p>
          {/* <div className={styles.tags}>
            <div className={styles.tag}>Lorem ipsum</div>
          </div> */}
          <div className={styles.stats}>
            <div className={styles.cap}>
              <h4>Market Cap</h4>
              <p>{stockDetails?.data?.MarketCapitalization}</p>
            </div>
            <div className={styles.ratio}>
              <h4>P/E Ratio</h4>
              <p>{stockDetails?.data?.PERatio}</p>
            </div>
            <div className={styles.beta}>
              <h4>Beta</h4>
              <p>{stockDetails?.data?.Beta}</p>
            </div>
            <div className={styles.yield}>
              <h4>Divident Yield</h4>
              <p>{stockDetails?.data?.DividendYield}</p>
            </div>
            <div className={styles.margin}>
              <h4>Profit Margin</h4>
              <p>{stockDetails?.data?.ProfitMargin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockDetails
