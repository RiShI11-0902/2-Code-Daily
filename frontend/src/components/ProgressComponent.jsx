import React, { useEffect, useState } from 'react'
import useUserStore from '../store/store'
import axios from 'axios'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressComponent = () => {

    const [avg, setAvg] = useState()

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Interview Correctness (%)",
                data: [],
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            }
        ]
    })

    const { user } = useUserStore()

    const getProgress = async () => {
        try {
            const data = await axios.post("http://localhost:5000/auth/getProgress", { id: user._id })
            console.log(data);
            setAvg(data.data.average)

            const labels = data.data.progressData.map((interview) => new Date(interview.date).toLocaleDateString())
            const correctness = data.data.progressData.map((interview) => interview.correctness)

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Interview Correctness %',
                        data: correctness,
                        borderColor: "rgb(54, 162, 235)",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        tension: 0.4,
                    }
                ]
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProgress()
    }, [])

    return (
        <>
            <section className='flex flex-col items-center w-full p-4 space-y-20 justify-evenly'>
                {/* Top Stats Section */}
                <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
                    <div className="text-[#635efc] text-lg bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                        Interview Given: <span className='text-xl font-bold'>{user?.solvedQuestions?.length}</span>
                    </div>
                    <div className="text-lg text-[#635efc] bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                       Avg. Accuracy: <span className={`text-xl font-bold ${avg < 40 ? 'text-red-600' : (avg < 70 ? 'text-yellow-800' : 'text-green-700')}`}>{avg}%</span>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="w-full max-w-4xl h-[400px]">
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </section>
        </>
    )
}

export default ProgressComponent;
