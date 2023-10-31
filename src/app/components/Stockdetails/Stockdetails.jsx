import React, { useEffect, useState } from "react"
import styles from "./Stockdetails.module.scss"
import Image from "next/image"
import generalStock from "../../../../libs/assets/icons/general_stock.png"
import useStocks from "../../../../libs/data-access/useStocks"
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

import upArrow from "../../../../libs/assets/icons/up_arrow.svg"
import downArrow from "../../../../libs/assets/icons/down_arrow.svg"
import { function_responses, function_types, graph_types } from "./components/constants"

function StockDetails({ selectedStock, setSelectedStock }) {
  const [functionType, setFunctionType] = useState(0)
  const { stockDetails, stockGraph } = useStocks({ symbol: selectedStock?.ticker, interval: functionType === 0 && "60", functionType: function_types[functionType > 3 ? 3 : functionType] })
  const [graphData, setGraphData] = useState([])
  const [dataToShowMonthly, setDataToShowMonthly] = useState([])

  useEffect(() => {
    const dayDataArray = []
    const mainObject = stockGraph?.data?.[function_responses[functionType > 3 ? 3 : functionType]]
    if (!mainObject) return

    const keys = Object.keys(mainObject)
    let firstEntry = null
    if (keys.length > 0) {
      const firstEntryKey = keys[0]
      firstEntry = firstEntryKey.split(" ")[0]
    }

    for (const key in mainObject) {
      if (mainObject.hasOwnProperty(key) && (functionType !== 0 || key.startsWith(firstEntry))) {
        const value = mainObject[key]["4. close"]

        let timeStamp = key
        if (functionType === 0) {
          const dateTime = new Date(key)
          const hours = dateTime.getHours().toString().padStart(2, "0")
          const minutes = dateTime.getMinutes().toString().padStart(2, "0")
          timeStamp = `${hours}:${minutes}`
        }

        dayDataArray.push({ name: timeStamp, close: parseFloat(value) })
      }
    }
    setGraphData(dayDataArray)
    console.log("graphData", graphData)
  }, [stockGraph])

  useEffect(() => {
    if (functionType < 3 || !graphData?.length) return

    const currentDate = new Date()

    // Calculate the date for 3 months ago
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

    // Calculate the date for 6 months ago
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6)

    // Calculate the date for 1 year ago
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1)

    if (functionType === 3) {
      const pastThreeMonthsData = graphData.filter((item) => new Date(item.name) >= threeMonthsAgo && new Date(item.name) <= currentDate)
      setDataToShowMonthly(pastThreeMonthsData)
    } else if (functionType === 4) {
      const pastSixMonthsData = graphData.filter((item) => new Date(item.name) >= sixMonthsAgo && new Date(item.name) <= currentDate)
      setDataToShowMonthly(pastSixMonthsData)
    } else {
      const pastYearData = graphData.filter((item) => new Date(item.name) >= oneYearAgo && new Date(item.name) <= currentDate)
      setDataToShowMonthly(pastYearData)
    }
  }, [functionType, graphData])

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
        <LineChart width={800} height={300} data={functionType > 2 ? dataToShowMonthly : graphData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" dataConvertor={(value) => parseInt(value)} />
        </LineChart>

        <div className={styles.graphType}>
          {graph_types?.map((type, i) => (
            <span key={`graph_type_${type}`} onClick={() => setFunctionType(i)} className={functionType === i && styles.active}>
              {type}
            </span>
          ))}
        </div>
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
