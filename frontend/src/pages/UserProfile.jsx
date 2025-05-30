import React from 'react';
import { X } from 'lucide-react';
import useUserStore from '../store/store';

const UserProfile = ({ setViewState }) => {

    const { user } = useUserStore()
    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 bg-opacity-50 p-4">
            <div className="relative w-full max-w-2xl rounded-2xl shadow-lg bg-stone-950 text-white montserrat-heading p-6 max-h-[90vh] overflow-y-auto">

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
                        src={user.image || "/default-avatar.png"}
                        alt="User"
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-white"
                    />
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-sm">{user.email}</p>
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
                {user.payments?.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-xl font-bold mb-3">Payment History</h3>
                        <div className="space-y-4">
                            {user.payments.map((payment, index) => (
                                <div
                                    key={index}
                                    className="bg-[#07061f] border border-white/10 rounded-lg p-4 text-sm space-y-1"
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
