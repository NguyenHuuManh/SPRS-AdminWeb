import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { isEmpty } from "lodash-es";
import { CButton, CCol, CRow, CCardTitle } from "@coreui/react";
import React from "react";
const Linechart = (props) => {
    const { data } = props;

    const filterLable = (key) => {
        if (key === 'ReliefPoint') return "Cứu trợ"
        if (key === 'StorePoint') return "Cửa hàng"
        if (key === 'SOS') return "SOS"
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
            borderColor: filterColor(key),
            borderCapStyle: 'butt',
            data: value,
            fill: false,
            lineTension: 0.1,
        };
    })
    return (
        <>
            <CChartLine
                style={{ height: 300 }}
                datasets={datasets}
                labels={data.lables}
                options={{
                    tooltips: {
                        enabled: true
                    },
                    scales: {
                        yAxes: [{
                            // stacked: true,
                            ticks: { beginAtZero: true },
                            display: true
                        }],
                    },
                    maintainAspectRatio: false,
                    responsive: true
                }}

                multiple={false}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CCardTitle>{data?.lables?.length == 30 ? "Biểu đồ 30 ngày gần nhất" : "Biểu đồ 12 tháng gần nhất"}</CCardTitle>
            </div>
        </>
    )
}
export default Linechart;