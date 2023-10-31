import React, { useEffect, useState } from "react"
import styles from "./Stockdetails.module.scss"
import Image from "next/image"
import generalStock from "../../../../libs/assets/icons/general_stock.png"
import useStocks from "../../../../libs/data-access/useStocks"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

import upArrow from "../../../../libs/assets/icons/up_arrow.svg"
import downArrow from "../../../../libs/assets/icons/down_arrow.svg"

function StockDetails({ selectedStock, setSelectedStock }) {
  const functionTypes = ["TIME_SERIES_INTRADAY", "TIME_SERIES_DAILY", "TIME_SERIES_WEEKLY", "TIME_SERIES_MONTHLY"]
  const [functionType, setFunctionType] = useState(0)
  const { stockDetails, stockGraph } = useStocks({ symbol: "IBM", interval: "60", functionType: functionTypes[functionType] })
  const [graphData, setGraphData] = useState({
    dayData: [],
    weekData: [],
    monthData: [],
    quaterData: [],
    halfYearData: [],
    yearData: [],
  })

  useEffect(() => {
    const dayDataArray = []
    const mainObject = stockGraph?.data?.["Time Series (60min)"]
    if (!mainObject) return

    const keys = Object.keys(mainObject)
    let firstEntry = null
    if (keys.length > 0) {
      const firstEntryKey = keys[0]
      firstEntry = firstEntryKey.split(" ")[0]
    }

    for (const key in mainObject) {
      if (mainObject.hasOwnProperty(key) && key.startsWith(firstEntry)) {
        const value = mainObject[key]["4. close"]

        const dateTime = new Date(key)
        const hours = dateTime.getHours().toString().padStart(2, "0")
        const minutes = dateTime.getMinutes().toString().padStart(2, "0")
        const timeString = `${hours}:${minutes}`
        dayDataArray.push({ name: timeString, close: parseFloat(value) })
      }
    }
    setGraphData((prev) => ({ ...prev, dayData: dayDataArray }))
  }, [stockGraph])

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
          <p>${selectedStock?.price}</p>
          <div className={selectedStock?.change_percentage?.includes("-") ? styles.lose : styles.gain}>
            {selectedStock?.change_percentage} <span> {!selectedStock?.change_percentage?.includes("-") ? <Image src={upArrow} alt="Up arrow" width={10} height={10} /> : <Image src={downArrow} alt="down arrow" width={10} height={10} className={styles.downArrow} />}</span>
          </div>
        </div>
      </div>
      <div className={styles.graph}>
        <LineChart width={800} height={300} data={graphData?.dayData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" dataConvertor={(value) => parseInt(value)} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
      <div className={styles.description}>
        <h2>About {stockDetails?.data?.Name}</h2>
        <div className={styles.seperator}></div>
        <div className={styles.desc}>
          <p className={styles.text}>{stockDetails?.data?.Description}</p>
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
