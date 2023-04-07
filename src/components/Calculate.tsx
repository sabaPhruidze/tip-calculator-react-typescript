import styles from "../components/calculate.module.css"
import { useState,useEffect } from "react"

export default function Calculate(props:any) {
    type billInput =number
    const [cBill,sBill] = useState<billInput>(0) //c means current. s means set.
    const [cTip,sTip] = useState<billInput>(0)
    const [cSumOfBAT,sSumOfBAT] = useState<billInput>(0) //current sum of bill and tip
    const {cPeopleNumber,sPeopleNumber} = props
    const [cTPP,sTPP] = useState<number>(0)  // current total per person, set total per person
    useEffect(() => {
        //by this we know what is the sum of bill and tip
        sSumOfBAT(() => {
            return (
                (cBill * cTip / 100) + cBill
            )
           
        })
        
    },[cBill,cTip])
    useEffect(() => {
        sTPP(() => {
            return (
                cSumOfBAT / cPeopleNumber
            )
        })
    },[cBill,cTip,cPeopleNumber])


  return (
    <div className={styles.container}>
        <div className={styles.billTotal}>
            <h4>Bill total</h4>
            <span className={styles.AbsoluteBill}>$</span>
            <input type="text" placeholder="00.0" onChange={(e) => {
                sBill(Number(e.target.value.replace(/[^0-9]/g, '')))
                // replace method to remove non-numeric characters (it replaces with string of nothing), we ensure that the input element only accepts numeric values.
            }}
            value={cBill}
            />
        </div>
        <div className={styles.tip}>
            <h4>Tip</h4>
            <span className={styles.AbsoluteTip}>%</span>
            <input type="text" placeholder="10" onChange={(e) => {
                sTip(Number(e.target.value.replace(/[^0-9]/g, '')))
                /*replace method to remove non-numeric characters, we ensure that the input element only accepts numeric values. */ 
            }}
            value={cTip}
            />
        </div>
        <div className={styles.flexRow}>
            <div className={styles.people}>
                <h4>People</h4>
                <div className={styles.flexRowAJ}>
                    <div className={styles.btn} onClick={() => {
                        sPeopleNumber(cPeopleNumber + 1)
                    }}>+</div>
                    <h2>{cPeopleNumber}</h2>
                    <div className={styles.btn} onClick={() => {
                        sPeopleNumber(cPeopleNumber > 1 ? cPeopleNumber - 1 : 1)
                        //using this it will not become less than 1 because there must be at list 1 person who will pay
                    }}>-</div>
                </div>
            </div>
            <div className={styles.totalPerPerson}>
                <h4>Total per Person</h4>
                <h2>$ {cTPP}</h2>
                {/* {typeof cTPP === 'number' || cTPP !== 0  ? cTPP : "0.00"} */}
            </div>
        </div>
    </div>
  )
}
