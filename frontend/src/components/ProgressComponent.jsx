import React, { useEffect, useState } from "react";
import useUserStore from "../store/store";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FiLoader } from "react-icons/fi";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressComponent = () => {
    const [avg, setAvg] = useState(0);
    const [progressData, setProgressData] = useState([]);  // Stores original data
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedDate, setSelectedDate] = useState(""); // Stores selected date
    const [loading, setLoading] = useState(true)

    const { user } = useUserStore();

    const getProgress = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/user/getProgress", { id: user._id });
            setAvg(data.average);
            setProgressData(data.progressData);  // Store full progress data
            updateChart(data.progressData); // Initially set full data in chart
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProgress();
    }, []);

    // Function to filter and update chart data
    const updateChart = (data) => {
        const labels = data.map((interview) => new Date(interview.date).toLocaleDateString());
        const correctness = data.map((interview) => interview.correctness);

        setChartData({
            labels,
            datasets: [
                {
                    label: "Interview Correctness (%)",
                    data: correctness,
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                }
            ]
        });
        setLoading(false)
    };

    // Handle date filtering
    const handleDateChange = (event) => {
        const selected = event.target.value;
        setSelectedDate(selected);

        if (!selected) {
            updateChart(progressData); // Reset chart if no date selected
            return;
        }

        const filteredData = progressData.filter((interview) =>
            new Date(interview.date).toISOString().split("T")[0] === selected
        );

        updateChart(filteredData);
    };

    return (
        <section className="flex flex-col items-center w-full p-4 space-y-10">
            {/* Stats Section */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
                <div className="text-[#635efc] text-lg bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                    Interview Given: <span className="text-xl font-bold">{user?.solvedQuestions?.length}</span>
                </div>
                <div className="text-lg text-[#635efc] bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                    Avg. Accuracy: <span className={`text-xl font-bold ${avg < 40 ? 'text-red-600' : (avg < 70 ? 'text-yellow-800' : 'text-green-700')}`}>{Number(avg.toFixed(1))}%</span>
                </div>
            </div>

            {/* Date Picker */}
            <div className="flex items-center space-x-3">
                <label className="text-lg text-white font-semibold">Select Date:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border p-2 rounded-md"
                />
            </div>

            {/* Chart Section */}
            <div className="w-full max-w-4xl h-[400px]">
                {
                    loading ? <FiLoader className="animate-spin w-20 text-white flex items-center justify-center  "/>:<Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                }
            </div>
        </section>
    );
};

export default ProgressComponent;


