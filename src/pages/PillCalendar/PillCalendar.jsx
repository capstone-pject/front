import React from 'react'
import styles from "./PillCalendar.module.css"
import counterStore from '../../stores/counterStore';

const PillCalendar = () => {
  const {count,increase,increaseBy} = counterStore();

  return (
    <div>
      <div className={styles.example}>Hello</div>
      <h1>count:{count}</h1>
      <button onClick={increase}>inc</button>
      <button onClick={()=>increaseBy(10)}>10inc</button>
    </div>
  )
}

export default PillCalendar
