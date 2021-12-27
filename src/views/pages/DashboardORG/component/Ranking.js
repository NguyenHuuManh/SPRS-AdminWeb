import { CCardTitle } from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import React, { useEffect, useState } from "react";
import { apiGetTopUserORG } from "src/apiFunctions/Dashboard";
const Ranking = (props) => {
    const [data, setData] = useState({
        dataChart: [],
        lableChart: []
    })
    const getReport = (values) => {
        apiGetTopUserORG(values).then((e) => {
            if (e?.status == 200) {
                if (e.data.code == '200') {
                    console.log("e.data.", e.data.obj);
                    setData({
                        dataChart: e.data?.obj?.data?.map((item) => item.total),
                        lableChart: e.data?.obj?.data?.map((item) => item.name)
                    });
                }
            }

        })
    }

    useEffect(() => {
        getReport();
    }, []);

    console.log(data)

    return (
        <>
            <CChartBar
                style={{ height: 360 }}
                datasets={[{
                    barThickness: 50,
                    label: "Top 5",
                    backgroundColor: 'blue',
                    data: data.dataChart,
                }]}
                labels={data?.lableChart}
                options={{
                    tooltips: {
                        enabled: true
                    },
                    scales: {
                        yAxes: [{
                            ticks: { beginAtZero: true },
                            display: true
                        }],
                    },
                    maintainAspectRatio: false,
                    responsive: true
                }}
            />

        </>
    )
}

export default React.memo(Ranking);