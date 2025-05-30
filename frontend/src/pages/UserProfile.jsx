import React from 'react';
import { X } from 'lucide-react';
import useUserStore from '../store/store';

const UserProfile = ({ setViewState }) => {
const UserProfile = ({ setViewState }) => {

    // const { user } = useUserStore()
    // if (!user) return null;

  const user = {
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
  }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative w-full max-w-4xl rounded-2xl shadow-lg bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white montserrat-heading p-6 max-h-[90vh] overflow-y-auto">

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                    onClick={() => setViewState('questions')}
                >
                    <X size={20} />
                </button>

                {/* User Info */}
                <div className="text-center space-y-4">
                    <img
                        src={user?.image || "/default-avatar.png"}
                        alt="User"
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-white"
                    />
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <p className="text-sm">{user?.email}</p>
                </div>

                {/* Plan Info */}
                <div className="mt-6 text-center space-y-1">
                    <h3 className="text-lg font-semibold">Plan: {user.selectedPlan || "Free"}</h3>
                    <p>Subscribed: {user.isSubscribed ? "Yes" : "No"}</p>
                    <p>Free Interviews Left: {user.freeInterview}</p>
                    {user.lastPaymentAmount && (
                        <p>Last Payment: ₹{user.lastPaymentAmount / 100}</p>
                    )}
                </div>

                {/* Payment History */}
                {user?.payments?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">Payment History</h3>
                        <div className="space-y-4">
                            {user?.payments.map((payment, index) => (
                                <div
                                    key={index}
                                    className="bg-[#1B1A55] border border-white/10 rounded-lg p-4 text-sm space-y-1"
                                >
                                    <p><span className="font-semibold">Plan:</span> {payment.planName}</p>
                                    <p><span className="font-semibold">Amount:</span> ₹{payment.amount}</p>
                                    <p><span className="font-semibold">Status:</span> <span className={`font-bold ${payment.status === "Paid" ? "text-green-400" : payment.status === "Failed" ? "text-red-400" : "text-yellow-300"}`}>{payment.status}</span></p>
                                    <p><span className="font-semibold">Order ID:</span> {payment.order_id}</p>
                                    <p><span className="font-semibold">Payment ID:</span> {payment.payment_id}</p>
                                    <p><span className="font-semibold">Used Interviews:</span> {payment.usedInterviews}/{payment.totalInterviews}</p>
                                    <p><span className="font-semibold">Created:</span> {new Date(payment.createdAt).toLocaleString()}</p>
                                    {payment.expiresAt && (
                                        <p><span className="font-semibold">Expires:</span> {new Date(payment.expiresAt).toLocaleString()}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
