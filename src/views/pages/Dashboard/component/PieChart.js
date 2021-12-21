import { CCardTitle } from "@coreui/react";
import { CChartPie } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import { apiGetReportOverview } from "src/apiFunctions/Dashboard";
const Piechart = () => {
    const [data, setData] = useState([])
    const getReport = (values) => {
        apiGetReportOverview(values).then((e) => {
            if (e?.status == 200) {
                if (e.data.code == '200') {
                    console.log("e.data.", e.data.obj);
                    const dataChart = [];
                    const lableChart = []
                    e?.data?.obj.forEach(element => {
                        dataChart.push(element.total)
                        lableChart.push(element.type_point === 1 ? "Cứu trợ" : element.type_point === 2 ? "Cửa hàng" : element.type_point === 3 ? "Tổ chức" : "SOS")
                    });
                    setData({
                        dataChart: dataChart,
                        lableChart: lableChart
                    });
                }
            }

        })
    }

    useEffect(() => {
        getReport();
    }, []);

    return (
        <>
            <CChartPie
                datasets={[
                    {
                        backgroundColor: [
                            'green',
                            'blue',
                            'orange',
                            'red'
                        ],
                        data: data.dataChart
                    }
                ]}
                labels={data.lableChart}

                options={{
                    tooltips: {
                        enabled: true
                    }
                }}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CCardTitle>Biểu đồ tổng các điểm của toàn hệ thống</CCardTitle>
            </div>
        </>
    )
}
export default Piechart;