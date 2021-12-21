import { CCardTitle } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { isEmpty } from "lodash-es";
import React from "react";
const LineChart = (props) => {
    const { data } = props;

    const filterLable = (key) => {
        if (key === 'ReliefPoint') return "Cứu trợ"
        if (key === 'StorePoint') return "Cửa hàng"
        if (key === 'SOS') return "Cứu trợ"
        if (key === 'Organization') return "Tổ chức"
    }

    const filterColor = (key) => {
        if (key === 'ReliefPoint') return "green"
        if (key === 'StorePoint') return "blue"
        if (key === 'SOS') return "red"
        if (key === 'Organization') return "orange"
    }
    const datasets = isEmpty(data.dataChart) ? [] : Object.entries(data.dataChart).map(([key, value]) => {
        return {
            label: filterLable(key),
            backgroundColor: filterColor(key),
            data: value.map((e) => e.total),
        };
    })
    return (
        <>
            <CChartLine
                datasets={datasets}
                labels={data.lables}
                options={{
                    tooltips: {
                        enabled: true
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false
                            }
                        }]
                    },
                }}
            // multiple={false}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CCardTitle>{data?.lables?.length == 30 ? "Biểu đồ 30 ngày gần nhất" : "Biểu đồ 12 tháng gần nhất"}</CCardTitle>
            </div>
        </>
    )
}
export default LineChart;