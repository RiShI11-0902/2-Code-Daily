import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "../components/Sidebar";
import QuestionBox from "../components/QuestionBox";
import QuestionDetails from "../components/QuestionDetails";
import useUserStore from "../store/store";
import { X, AlignJustify } from 'lucide-react'
import ProgressComponent from "../components/ProgressComponent";
import { ToastContainer, toast } from "react-toastify";
import InterviewPage from "./InterviewPage";

const Dashboard = () => {
  const [questions, setQuestions] = useState();
  const [filteredQuestions, setFilteredQuestions] = useState();
  const [showSolved, setShowSolved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressBar, setProgressBar] = useState(false)
  const [isExpired, setisExpired] = useState()
  const [visible, setVisible] = useState()
  const [expiryDate, setexpiryDate] = useState()

  const scrollContainerRef = useRef(null);

  const scrollToTop = () => {
    console.log(scrollContainerRef.current);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const { user, solvedQ } = useUserStore();


  // useEffect(() => {
  //   if (user?.currentExpiryDate) {
  //     const expiryDate = new Date(user.currentExpiryDate);
  //     const currentDate = new Date();

  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     const format = expiryDate.toLocaleDateString('en-US', options)
  //     setexpiryDate(format)
  
  //     // Calculate the time difference in milliseconds
  //     const timeDiff = currentDate - expiryDate;
  
  //     // Convert milliseconds to days
  //     const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  //     console.log(daysDiff);
      
  
  //     setisExpired(daysDiff >= 30);
  //   }
  // }, []);
  

  const notify = () => toast.success(`Already Subscribed!! Expiry On: ${expiryDate}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: "Bounce",
  });

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

    if (showSolved) {
      console.log("Called this one");

      const filteredSolved = user?.solvedQuestions?.filter((q) => {
        q.problem.toLowerCase(searchValue);
      });
      setFilteredQuestions(filteredSolved);
      return;
    }

    const filtered = questions.filter((q) =>
      q.title.toLowerCase().includes(searchValue)
    );
    setFilteredQuestions(filtered);

  }

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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={"Bounce"}
      />
      {/* Sidebar */}
      <button
        className="lg:hidden bg-gray-800 text-white p-3 w-fit fixed top-2 left-2  z-50 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5 fixed top-5 left-52" /> : <AlignJustify className="w-5 h-5" />}
      </button>
      <div
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-gray-800 text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar scrollToTop={scrollToTop} visible={visible} isExpired={isExpired} notify={notify} setShowSolved={setShowSolved} setProgressBar={setProgressBar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 mt-20 md:mt-0 lg:ml-64 p-4 lg:p-10 overflow-y-auto  h-[100vh]" ref={scrollContainerRef} >
        {/* Search and Filter */}
        {
          progressBar && <ProgressComponent />
        }

        {
          !progressBar && !showSolved && <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 mb-8">
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
        {!progressBar && 
        <div 
          className="flex flex-col sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-3 ">
          {showSolved
            ? user?.solvedQuestions?.length > 0
              ? <InterviewPage/>
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

    


    </div>
  );
};

export default Dashboard;
