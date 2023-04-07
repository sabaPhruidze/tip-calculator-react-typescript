import styles from "../components/calculate.module.css"
import { useState, useEffect, useRef } from "react";

 export default function Calculate(props: any) { 
    type billInput = number;
     const [cBill, sBill] = useState(0); 
     const [cTip, sTip] = useState(0); 
     const [cSumOfBAT, sSumOfBAT] = useState(0); 
     const { cPeopleNumber, sPeopleNumber } = props; 
     const [cTPP, sTPP] = useState(0); // current total per person, set total per person 
     const prevBill = useRef(cBill); // I used the use ref so it will update the cBill instanly after every change
     const prevTip = useRef(cTip); // I used the use ref so it will update the cBill instanly after every change
     useEffect(() => { 
        // by this we know what is the sum of bill and tip 
        if (cBill !== prevBill.current || cTip !== prevTip.current) { 
            sSumOfBAT(cBill * (1 + cTip / 100)); prevBill.current = cBill; 
            prevTip.current = cTip; } }, [cBill, cTip]); 
            useEffect(() => { sTPP(() => { return (cSumOfBAT / cPeopleNumber); }); 
        }, [cSumOfBAT, cPeopleNumber]);
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
                <h2>$ {typeof cTPP === "number" && cTPP!== 0 ? cTPP.toFixed(2) : "0.00"}</h2> 
                {/* using toFixed total per person have  only two number after dot . */}
                {/* {typeof cTPP === 'number' || cTPP !== 0  ? cTPP : "0.00"} */}
            </div>
        </div>
    </div>
  )
}
