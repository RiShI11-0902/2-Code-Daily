import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    const referenceid = queryParams.get("referenceid")

    if (referenceid) {
      setPaymentId(referenceid);
    }
    
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-stone-950">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M20.94 5.94a1.5 1.5 0 0 0-2.12 0L9 15.75l-3.82-3.82a1.5 1.5 0 0 0-2.12 2.12l5 5a1.5 1.5 0 0 0 2.12 0l11-11a1.5 1.5 0 0 0 0-2.12z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
        <p className="text-gray-600 mt-2">Your payment was successful.</p>

        {paymentId && (
          <p className="text-gray-700 font-semibold mt-4 flex flex-col space-y-5">
            <p>Reference ID: <span className="text-blue-600">{paymentId}</span></p>
          </p>
        )}

        <button
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard & Start Coding 🚀
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
