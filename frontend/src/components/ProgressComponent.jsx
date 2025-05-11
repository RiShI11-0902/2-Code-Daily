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
    const [update, setUpdate] = useState({
        lastDate: null,
        newDate: null,
        show: true
    })
    const [showAnalysis, setShowAnalysis] = useState({
        show: false,
        data: null
    })
    const [analyzing, setAnalyzing] = useState()
    const [error, setError] = useState()
    const [solvedLen, setsolvedLen] = useState(0)
    const [avgTime, setAvgTime] = useState(0)

    const { user, userData } = useUserStore();

    const getProgress = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/getProgress`, { id: user._id });

            setAvg(data.average ?? 0);
            setAvgTime(data.avgTime ?? 0)

            setProgressData(data.progressData);  // Store full progress data
            updateChart(data.progressData); // Initially set full data in chart
            setsolvedLen(data.foundQuestions)
            setLoading(false)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getProgress();
    }, []);

    const updateChart = (data) => {
        if (data.length === 0) {
            setChartData({ labels: [], datasets: [] });
            return;
        }

        // Sort data by date ascending
        const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

        const labels = sortedData.map((interview) =>
            new Date(interview.date).toLocaleDateString()
        );

        const correctness = sortedData.map((interview) => interview.correctness);

        setChartData({
            labels,
            datasets: [
                {
                    label: "Interview Correctness (%)",
                    data: correctness,
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,  // Smooth line
                    spanGaps: true  // Connect all points, ignoring gaps
                }
            ]
        });
        setLoading(false);
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

    const formatTime = (averageTime) => {
        const avgMinutes = Math.floor(averageTime / 60);
        const avgSeconds = Math.floor(averageTime % 60);

        return ` ${avgMinutes}m ${avgSeconds}s`

    }

    const analyze = async () => {

        try {
            const totalSolved = user?.solvedQuestions?.length || 0;
            const lastAnalyzedCount = user?.lastAnalyzedCount || 0;

            const shouldCallAPI = totalSolved - lastAnalyzedCount >= 10;

            if (shouldCallAPI) {
                setAnalyzing(true);
                try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/analyze-progress`, { id: user._id });

                    setShowAnalysis({
                        show: true,
                        data: res?.data?.analysis
                    });
                    userData(res?.data?.user)
                } catch (error) {
                    console.error(error);
                    setError(error.response?.data?.message || "Something went wrong");
                } finally {
                    setAnalyzing(false);
                }
            }
        } catch (error) {
            setError(error?.response?.data?.message)
        } finally {
            setShowAnalysis({
                show: true,
                data: user.improvements[0]?.analysis
            });
        }
    };

    return (
        <>

            <section className="flex flex-col items-center w-full p-4 space-y-10">
                {/* Stats Section */}
                <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
                    {/* {user?.selectedPlan === 'Elite' && user?.solvedQuestions?.length > 0 ? (
                        <div className="text-[#3d37ef] text-lg bg-[#ababf5] p-3 rounded-2xl w-52 max-w-xs text-center shadow-md flex flex-col items-center">
                            <button onClick={analyze} className="text-lg font-bold">
                                {analyzing ? "Analyzing.." : "Analyze Progress"}
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm bg-gray-100 p-3 rounded-2xl w-52 max-w-xs text-center shadow-sm flex flex-col items-center">
                            <p className="font-medium">Analyzing only for Elite users</p>
                        </div>
                    )} */}
                    <div className="text-[#635efc] text-lg bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                        Interview Given: <span className="text-xl font-bold">{solvedLen}</span>
                    </div>
                    <div className="text-lg text-[#635efc] bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                        Avg. Accuracy: <span className={`text-xl font-bold ${avg < 40 ? 'text-red-600' : (avg < 70 ? 'text-yellow-800' : 'text-green-700')}`}>{Number(avg?.toFixed(1))}%</span>
                    </div>
                    <div className="text-lg text-[#635efc] bg-[#e6e6eb] p-3 rounded-2xl w-full max-w-xs text-center shadow-md">
                        Avg. Time: <span className={`text-xl font-bold `}>{formatTime(avgTime)}</span>
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
                        loading ? <FiLoader className="animate-spin w-20 text-white flex items-center justify-center  " /> : <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    }
                </div>
            </section>

            {
                showAnalysis.show &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 h-fit">
                    <div className="bg-[#070F2B] shadow-lg rounded-lg max-w-4xl w-full p-6 relative text-white">

                        {/* Close Button */}
                        <button
                            onClick={() => setShowAnalysis({ show: false, data: {} })}
                            className="absolute top-3 right-3 bg-[#1B1A55] hover:bg-[#535C91] text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                        >
                            ✕
                        </button>

                        {/* Modal Content */}
                        <h2 className="text-2xl font-bold mb-4 text-center">Your Future Plan to Study</h2>

                        <div className="flex justify-around text-sm mb-4">
                            {user.improvements.length > 0 && (
                                <span>
                                    Last Updated On: {new Date(user.improvements[0].dateCreated).toDateString()}
                                </span>
                            )}
                            {user.improvements.length === 0 && (
                                <span>No previous analysis found</span>
                            )}
                        </div>

                        {error && <p className="text-red-700 mt-2">{error}</p>}

                        <div className="bg-[#1B1A55] p-4 rounded-lg text-[#9290C3] space-y-5">
                            <p className="font-semibold text-blue-300">
                                <span className="text-lg text-blue-50 font-bold">Topics:</span>{" "}
                                {showAnalysis?.data?.topics || "No topics available."}
                            </p>
                            <p className="font-semibold text-blue-300">
                                <span className="text-lg text-blue-50 font-bold">Focus:</span>{" "}
                                {showAnalysis?.data?.focus || "Nothing to focus on."}
                            </p>
                            <p className="font-semibold text-blue-300">
                                <span className="text-lg text-blue-50 font-bold">Difficulty:</span>{" "}
                                {showAnalysis?.data?.difficult || "No difficulty suggestion."}
                            </p>
                            {showAnalysis?.data?.dateCreated && (
                                <p className="text-sm text-gray-400">
                                    Generated on: {new Date(showAnalysis.data.dateCreated).toDateString()}
                                </p>
                            )}
                            {showAnalysis?.data?.message && (
                                <p className="text-sm text-green-400">
                                    {showAnalysis.data.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            }


        </>
    );
};

export default ProgressComponent;


