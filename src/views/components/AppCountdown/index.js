import React, { useEffect, useState } from "react";
const CountDown = (props) => {
    const { onClick, minuteStart, onStop } = props;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        if (!minuteStart || !minuteStart?.value) return;
        let sec = 0;
        let minute = minuteStart?.value;
        const countDown = setInterval(function () {
            if (minute == 0 && sec == 0) {
                console.log(minute, 'minute');
                onStop && onStop();
                clearInterval(countDown);
            } else {
                if (sec == 0) {
                    minute--;
                    sec = 60;
                    if (minute == 0) {
                    }
                } else {
                    sec--;
                }
                setMinutes(minute);
                setSeconds(sec);
            }

        }, 1000);
    }, [minuteStart])

    return (
        <div>
            <div className="countdown-wrapper">
                {(minutes == 0 && seconds == 0) ? (
                    <div className="countdown-item">
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            onClick();
                        }}> gửi lại</a>
                    </div>
                ) : (
                    <div className="countdown-item">
                        {minutes} : {seconds}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CountDown;