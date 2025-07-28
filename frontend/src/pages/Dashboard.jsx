import React, { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import QuestionBox from "../components/QuestionBox";
import useUserStore from "../store/store";
import { X, AlignJustify, MoveUp } from 'lucide-react';
import ProgressComponent from "../components/ProgressComponent";
import { ToastContainer, toast } from "react-toastify";
import InterviewPage from "./InterviewPage";
import {UserProfile} from "./UserProfile";

// Constants
const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: "Bounce"
};

// Types (if using TypeScript, these would be interfaces)
// type ViewState = 'questions' | 'progress' | 'profile' | 'solved';

const Dashboard = () => {
  // State management
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewState, setViewState] = useState('questions'); // 'questions', 'progress', 'profile', 'solved'
  const [remainInterview, setRemainInterview] = useState(0);

  // Refs
  const scrollContainerRef = useRef(null);

  // Store
  const { user, solvedQ } = useUserStore();

  // Derived state
  const showSolved = viewState === 'solved';
  const progressBar = viewState === 'progress';
  const userProfile = viewState === 'profile';

  // Handlers
  const scrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const notify = useCallback(() => {
    toast.success(`You have ${remainInterview} ${user?.isSubscribed ? '' : 'Free'} Interviews Remaining`, TOAST_CONFIG);
  }, [remainInterview]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Data fetching
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("./questions.json");
        const data = await response.json();
        const uniqueQuestions = data?.filter(
          (item, index, self) => index === self.findIndex((q) => q.id === item.id)
        );
        setQuestions(uniqueQuestions || []);
        setFilteredQuestions(uniqueQuestions || []);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        toast.error("Failed to load questions", TOAST_CONFIG);
      }
    };

    fetchQuestions();
  }, []);

  // Payment calculations
  useEffect(() => {
    if (user?.payments?.length > 0) {
      const lastPayment = user.payments[user.payments.length - 1];
      setRemainInterview(lastPayment.totalInterviews - lastPayment.usedInterviews);
    }
  }, [user]);

  // Search and filter handlers
  const handleSearch = useCallback((e) => {
    const searchValue = e.target.value.toLowerCase();

    if (!searchValue) {
      setFilteredQuestions(questions);
      return;
    }

    if (showSolved) {
      const filteredSolved = user?.solvedQuestions?.filter((q) =>
        q.problem.toLowerCase().includes(searchValue)
      ) || [];
      setFilteredQuestions(filteredSolved);
      return;
    }

    const filtered = questions.filter((q) =>
      q.title.toLowerCase().includes(searchValue)
    );
    setFilteredQuestions(filtered);
  }, [questions, showSolved, user?.solvedQuestions]);

  const handleFilter = useCallback((e) => {
    const value = e.target.value;
    let filtered = questions;

    if (value === "solved") {
      filtered = questions.filter((q) => solvedQ.includes(q.id));
    } else if (value === "unsolved") {
      filtered = questions.filter((q) => !solvedQ.includes(q.id));
    }

    setFilteredQuestions(filtered);
  }, [questions, solvedQ]);

  // View state handlers
  const showQuestionsView = () => setViewState('questions');
  const showProgressView = () => setViewState('progress');
  const showProfileView = () => setViewState('profile');
  const showSolvedView = () => setViewState('solved');

  // Render functions
  const renderMainContent = () => {
    switch (viewState) {
      case 'progress':
        return <ProgressComponent />;
      case 'profile':
        return <UserProfile setViewState={setViewState} />;
      case 'solved':
        return user?.solvedQuestions?.length > 0 ? (
          <InterviewPage />
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No solved questions yet.
          </p>
        );
      case 'questions':
      default:
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0 mb-8">
              <input
                type="text"
                placeholder="Search questions..."
                className="px-5 py-3 w-full sm:w-1/2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                aria-label="Search questions"
              />
              <select
                className="p-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFilter}
                aria-label="Filter questions"
              >
                <option value="all">All</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
            <button
              onClick={scrollToTop}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
              aria-label="Scroll to top"
            >
              <MoveUp className="text-[#f1f1f3] w-5 h-5" />
            </button>
            <div className="flex flex-col sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-3">
              {(filteredQuestions.length > 0 ? filteredQuestions : questions).map((question, index) => (
                <QuestionBox
                  index={index}
                  key={question.id}
                  question={question}
                  id={question.id}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <ToastContainer {...TOAST_CONFIG} />

      {/* Sidebar */}
      <button
        className="lg:hidden bg-gray-800 text-white p-3 w-fit fixed top-2 left-2 z-50 rounded-md"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 fixed top-5 left-52" />
        ) : (
          <AlignJustify className="w-5 h-5" />
        )}
      </button>

      <div
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-gray-800 text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar
          setSidebarOpen={setSidebarOpen}
          scrollToTop={scrollToTop}
          notify={notify}
          showSolvedView={showSolvedView}
          showProgressView={showProgressView}
          showProfileView={showProfileView}
          showQuestionsView={showQuestionsView}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 ml-0 mt-20 md:mt-0 lg:ml-64 p-4 lg:p-10 overflow-y-auto h-[100vh]"
        ref={scrollContainerRef}
      >
        {renderMainContent()}
      </div>
    </div>
  );
};

export default Dashboard;