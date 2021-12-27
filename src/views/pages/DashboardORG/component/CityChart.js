import { CCardTitle } from "@coreui/react";
import { CChartHorizontalBar } from "@coreui/react-chartjs";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from 'react';
import { apiGetReportProvince, apiGetReportProvinceORG } from "src/apiFunctions/Dashboard";
const CityChart = () => {

    const [data, setData] = useState({});
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
    const getReport = (values) => {
        const body = {
            type_point: [1]
        }
        apiGetReportProvinceORG(body).then((e) => {
            if (e?.status == 200) {
                if (e?.data.code == '200') {
                    setData({ lables: e.data.obj.label, dataChart: e.data.obj.data });
                }
            }
        })
    }

    useEffect(() => {
        getReport();
    }, [])

    return (
        <div style={{ height: 7000 }}>
            <CChartHorizontalBar
                style={{ height: 6900 }}
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
                <CCardTitle>Biểu đồ thống kê điểm tại các tỉnh thành</CCardTitle>
            </div>
        </div>
    )
}

export default CityChart;