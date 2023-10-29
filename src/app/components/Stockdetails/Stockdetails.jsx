import React from "react"
import styles from "./Stockdetails.module.scss"

function StockDetails() {
  return (
    <div className={styles.stockDetails}>
      <div className={styles.header}>
        <div className={styles.icon}></div>
        <div className={styles.details}>
          <p className={styles.title}>Name</p>
          <p>common park</p>
          <p>NSQ</p>
        </div>
        <div className={styles.price}>
          <p>$177.15</p>
          <p className={styles.gain}>+45%</p>
        </div>
      </div>
      <div className={styles.graph}></div>
      <div className={styles.description}>
        <h2>About NSQ</h2>
        <div className={styles.seperator}></div>
        <div className={styles.desc}>
          <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum sed labore totam ut a. Vel similique ratione, incidunt labore alias recusandae maxime ullam ut odio exercitationem voluptate quidem excepturi optio fuga vero deleniti aliquam quod perferendis aliquid adipisci dolorem esse? Quibusdam temporibus amet tempore molestiae doloribus dicta quaerat voluptates repellat.</p>
          <div className={styles.tags}>
            <div className={styles.tag}>Lorem ipsum</div>
          </div>
          <div className={styles.stats}>
            <div className={styles.cap}>
              <h4>Market Cap</h4>
              <p>$2.22T</p>
            </div>
            <div className={styles.ratio}>
              <h4>P/E Ratio</h4>
              <p>27.77</p>
            </div>
            <div className={styles.beta}>
              <h4>Beta</h4>
              <p>1.308</p>
            </div>
            <div className={styles.yield}>
              <h4>Divident Yield</h4>
              <p>50%</p>
            </div>
            <div className={styles.margin}>
              <h4>Profit Margin</h4>
              <p>0.247</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockDetails
