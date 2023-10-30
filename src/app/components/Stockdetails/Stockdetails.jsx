import React, { useEffect, useState } from "react"
import styles from "./Stockdetails.module.scss"
import Image from "next/image"
import generalStock from "../../../../libs/assets/icons/general_stock.png"
import useStocks from "../../../../libs/data-access/useStocks"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

function StockDetails() {
  const functionTypes = ["TIME_SERIES_INTRADAY", "TIME_SERIES_DAILY", "TIME_SERIES_WEEKLY", "TIME_SERIES_MONTHLY"]
  const [functionType, setFunctionType] = useState(0)
  const { stockDetails, stockGraph } = useStocks({ symbol: "IBM", interval: "60", functionType: functionTypes[functionType] })
  const [graphData, setGraphData] = useState({})

  useEffect(() => {
    // if (stockGraph?.data) stockGraph?.data?.map((data) => {})
  }, [stockGraph])

  console.log("stockGraph", stockGraph)

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
      <div className={styles.graph}>
        <LineChart width={800} height={300} data={stockGraph?.data?.["Time Series (60min)"]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
