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
                datasets={[{
                    label: "Top 5",
                    backgroundColor: 'blue',
                    data: data.dataChart.concat([0]),
                }]}
                labels={data?.lableChart.concat([''])}
                options={{
                    tooltips: {
                        enabled: true
                    }
                }}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CCardTitle>5 thành viên hoạt động nhiều nhất</CCardTitle>
            </div>
        </>
    )
}

export default React.memo(Ranking);