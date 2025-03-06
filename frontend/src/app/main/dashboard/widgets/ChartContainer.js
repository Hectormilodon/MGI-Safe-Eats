import { Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Chart from 'react-apexcharts';
import { selectUser } from "../../../store/userSlice";
import { ApiUserLocal, endpoints_userLocal } from 'app/api/userLocalApi';
import ChartForm from './ChartForm';
import moment from 'moment';
import 'moment/locale/es'; 

moment.locale('es'); 

const api = new ApiUserLocal()

function ChartContainer() {
    const [localSelected, setLocalSelected] = useState(null);

    const user = useSelector(selectUser);

    const [chartData, setChartData] = useState({});

    const [hasData, setHasData] = useState(false)

    const getChartData = async () => {
        if (localSelected) {
            const payload = { id_user: user.data.id, id_local: localSelected }
            const response = await api.post(endpoints_userLocal.CHART, payload);

            if (response && response.length > 0) {
                setChartData({
                    options: {
                        chart: {
                            id: 'Compliance'
                        },
                        xaxis: {
                            categories: response.map(item => moment(item.created_at).format('DD MMMM YYYY'))
                        },
                        dataLabels: {
                            enabled: false
                        },
                    },
                    series: [
                        {
                            name: '% de cumplimiento',
                            data: response.map(item => item?.compliance)
                        }
                    ]
                });
                setHasData(true)
            } else {
                setHasData(false)
                setChartData({})
            }
        }
    };

    useEffect(() => {
        if (localSelected) {
            getChartData();
        }
    }, [localSelected]);

    return (
        <Paper className="relative flex flex-col flex-auto pr-12 rounded-2xl shadow overflow-hidden items-center">
            <div className="column">
                <Typography variant='h6' className='mt-12'>Gráfico de aprobación de reportes</Typography>
                <ChartForm
                    setLocalSelected={setLocalSelected}
                />
                { hasData && chartData ? (
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="bar"
                        width="500"
                    />
                ) : (
                    localSelected &&
                    <div className='mb-24'>
                        <p>Este local no tiene reportes aprobados aún</p>
                    </div>

                )}

            </div>
        </Paper>
    );
}

export default ChartContainer;

// {chartData && chartData.series && localSelected && (
//     <Chart
//         options={chartData.options}
//         series={chartData.series}
//         type="bar"
//         width="500"
//     />
// )}