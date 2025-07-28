import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const userStore = (set) => ({
  user: {
    googleId: "1234567890abcdef",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://example.com/profile.jpg",
    password: "securePassword123",
  
    questions: [
      "Tell me about yourself",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in 5 years?"
    ],
  
    isSubscribed: true,
  
    solvedQuestions: [
    "new mongoose.Types.ObjectId(507f1f77bcf86cd799439011"
      // new mongoose.Types.ObjectId("507f1f77bcf86cd799439012")
    ],
  
    lastAnalyzedCount: 3,
  
    payments: [
      {
        order_id: "order_123456789",
        payment_id: "pay_987654321",
        signature: "signature_abcdef123456",
        amount: 2999,
        status: "Paid",
        createdAt: new Date("2023-05-15"),
        expiresAt: new Date("2023-11-15"),
        planName: "Pro",
        totalInterviews: 10,
        usedInterviews: 3
      },
      {
        order_id: "order_987654321",
        payment_id: "pay_123456789",
        signature: "signature_654321fedcba",
        amount: 999,
        status: "Failed",
        createdAt: new Date("2023-01-10"),
        expiresAt: new Date("2023-07-10"),
        planName: "Starter",
        totalInterviews: 5,
        usedInterviews: 0
      }
    ],
  
    freeInterview: 1,
  
    improvements: [
      {
        analysis: {
          communication: 8.5,
          confidence: 7.2,
          clarity: 7.8,
          feedback: "Try to maintain more eye contact and speak slightly slower"
        },
        dateCreated: new Date("2023-05-20")
      },
      {
        analysis: {
          communication: 9.1,
          confidence: 8.5,
          clarity: 8.7,
          feedback: "Great improvement! Your answers were more structured this time"
        },
        dateCreated: new Date("2023-06-05")
      }
    ],
  
    selectedPlan: "Pro",
  
    lastPaymentAmount: 2999
  },
  solvedQ: [],
  userData: (data) => {
    set((state) => ({
      ...state,
      user: data,
    }));
  },
  addQuestions: (data) => {
    set((state) => {
      const alreadySolved = state.solvedQ.includes(data);
      return {
        ...state,
        solvedQ:alreadySolved ? state.solvedQ.filter((id) => id != data) :  [...state.solvedQ, data],
      };
    });
  },
  removeUser: () => {
    set((state) => ({
      ...state,
      user: null,
    }));
  },
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
      partialize: (state)=> ({solvedQ: state.solvedQ}) // for partialize means if want only some things to store
    })
  )
);

export default useUserStore;
