import axios from "axios";

const handlePayment = async (user, selectedPlan) => {
  try {
    // 1. Create Razorpay order with user email and selected plan
    const {
      data: { order },
    } = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/userpayment/checkout`,
      {
        email: user.email,
        plan: selectedPlan,
      }
    );

    // 2. Get Razorpay key
    const {
      data: { key },
    } = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/userpayment/getKey`
    );

    // 3. Set up Razorpay options
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "2 Code Daily",
      description: "Interview Plan Purchase",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/userpayment/paymentverification`,
      prefill: {
        name: user.name || "Customer",
        email: user.email,
      },
      notes: {
        address: "2 Code Daily Office",
      },
      theme: {
        color: "#3399cc",
      },
      display_currency: "USD",
      handler: async function (response) {
        // 4. Verify payment
        await axios
          .post(
            `${
              import.meta.env.VITE_BACKEND_BASE_URL
            }/userpayment/paymentverification`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: user.email,
            }
          )
          .then((res) => {
            if (res.data.success) {
              // Redirect to payment success
              window.location.href = `${
                import.meta.env.VITE_FRONTEND_BASE_URL
              }/paymentsuccess?referenceid=${res.data.referenceId}`;
            }
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong during the payment process.");
  }
};

export default handlePayment;
