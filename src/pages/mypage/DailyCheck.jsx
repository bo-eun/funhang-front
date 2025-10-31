import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from "../../assets/css/mypage.module.css"
import Calendar from 'react-calendar';
import arrowLeft from "../../assets/img/calendar_arr_l.png"
import arrowRight from "../../assets/img/calendar_arr_r.png"


function DailyCheck(props) {
    const [value, onChange] = useState(new Date());

    const checkedDate = ['2025-10-11' ,'2025-10-26', '2025-10-27', '2025-10-28', '2025-10-29'];

    const getDateOnly = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
    }
    return (
        <div className={styles.daliy_cont}>
            <h3>출석 체크 현황</h3>

            <div className={styles.calendar_cont}>
                <Calendar 
                onChange={onChange} 
                value={value} 
                className={styles.calendar}
                prev2Label={null}
                next2Label={null}
                prevLabel={<img src={arrowLeft} />}
                nextLabel={<img src={arrowRight} />}
                tileClassName={({date}) => {
                    const dateStr = getDateOnly(date); 

                    // 특정 날짜에 클래스 추가
                    if (checkedDate.includes(dateStr)) {
                        return 'checked'
                    }
                }}
                 />
            </div>
        </div>
    );
}

export default DailyCheck;