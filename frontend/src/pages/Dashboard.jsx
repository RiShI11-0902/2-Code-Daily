import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "../components/Sidebar";
import QuestionBox from "../components/QuestionBox";
import QuestionDetails from "../components/QuestionDetails";
import useUserStore from "../store/store";
import { X,AlignJustify } from 'lucide-react'
import ProgressComponent from "../components/ProgressComponent";

const Dashboard = () => {
  const [toggle, setToggle] = useState();
  const [questions, setQuestions] = useState();
  const [filteredQuestions, setFilteredQuestions] = useState();
  const [showSolved, setShowSolved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressBar, setProgressBar] = useState(false)

  const { user, addQuestions, solvedQ } = useUserStore();

  useEffect(() => {
    fetch("./questions.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueQuestions = data?.filter(
          (item, index, self) => index === self.findIndex((q) => q.id === item.id)
        );
        setQuestions(uniqueQuestions);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredQuestions(questions);
      return;
    }
    const filtered = questions.filter((q) =>
      q.title.toLowerCase().includes(searchValue)
    );
    setFilteredQuestions(filtered);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === "solved") {
      setFilteredQuestions(
        questions.filter((q) => solvedQ.includes(q.id))
      );
    } else if (value === "unsolved") {
      setFilteredQuestions(
        questions.filter((q) => !solvedQ.includes(q.id))
      );
    } else {
      setFilteredQuestions(questions);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      {/* Sidebar */}
      <button
        className="lg:hidden bg-gray-800 text-white p-3 w-fit fixed top-2 left-2  z-50 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5 fixed top-5 left-52" /> : <AlignJustify className="w-5 h-5" />}
      </button>
      <div
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-gray-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar setShowSolved={setShowSolved} setProgressBar={setProgressBar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 mt-20 md:mt-0 lg:ml-64 p-4 lg:p-10">
        {/* Search and Filter */}
        {
          progressBar && <ProgressComponent />
        }

        {
          !progressBar && <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            className="px-5 py-3 w-full sm:w-1/2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
          />
          <select
            className="p-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleFilter}
          >
            <option value="all">All</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>
        }

        {/* Question List */}
       { !progressBar &&  <div className="flex flex-col sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {showSolved 
            ? user?.solvedQuestions?.length > 0
              ? user.solvedQuestions.map((id, index) => (
                  <QuestionBox
                    key={index}
                    setToggle={setToggle}
                    id={id}
                    question={null}
                    index={index}
                  />
                ))
              : <p className="text-center text-gray-500 col-span-full">No solved questions yet.</p>
            : (filteredQuestions || questions)?.map((question, index) => (
                <QuestionBox
                  key={index}
                  setToggle={setToggle}
                  question={question}
                  index={index}
                />
              ))}
        </div>}
      </div>

      {/* Question Details Modal */}
      {toggle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <QuestionDetails question={toggle} setToggle={setToggle} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
