import axios from "axios";
// import { useNavigate } from "react-router";
// import useUserStore from "../store/store";


// const handlePayment = async (user)=>{
    
//     const {data: {order}} = await axios.post("https://two-code-daily-1.onrender.com/userpayment/checkout", {email: user.email})

//     const {data:{key}} = await axios.get("https://two-code-daily-1.onrender.com/userpayment/getKey") 

//     // console.log(key);

//     console.log(order);
    

//     const options = {
//        "key" : key, // Enter the Key ID generated from the Dashboard
//         "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         "currency": "INR",
//         "name": "2 Code Daily", //your business name
//         "description": "Test Transaction",
//         "image": "https://example.com/your_logo",
//         "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "callback_url": "https://two-code-daily-1.onrender.com/userpayment/paymentverification",
//         "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//             "name": "Gaurav Kumar", //your customer's name
//             "email": "gaurav.kumar@example.com",
//             "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
//         },
//         "notes": {
//             "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//             "color": "#3399cc"
//         },
//         "handler": async function (response){
//             // Send response to backend for verification
//             await axios.post("https://two-code-daily-1.onrender.com/userpayment/paymentverification", {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 email: user?.email
//             }).then((res) => {
//                 console.log(res);
//                 if (res.data.success) {
//                     // userData(res.data.user)
//                     window.location.href = `http://localhost:5173/paymentsuccess?referenceid=${res.data.refernceid}&expiry=${res.data.expiriyDate}`
//                     // navigate("/paymentsuccess", {state:{refernceid: res.data.refernceid, expiry: res.data.expiriyDate}})
//                 }
//             });
//         }
//     };
    

//     const rzp = new window.Razorpay(options)
//     rzp.open()
// }

const handlePayment = async (user, selectedPlan) => {
    try {
      // 1. Create Razorpay order with user email and selected plan
      const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/userpayment/checkout`, {
        email: user.email,
        plan: selectedPlan, 
      });
  
      // 2. Get Razorpay key
      const { data: { key } } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/userpayment/getKey`);
  
      // 3. Set up Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "2 Code Daily",
        description: "Interview Plan Purchase",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${process.env.REACT_APP_BACKEND_BASE_URL}/userpayment/paymentverification`,
        prefill: {
          name: user.name || "Customer",
          email: user.email,
        },
        notes: {
          address: "2 Code Daily Office"
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          // 4. Verify payment
          await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/userpayment/paymentverification`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email: user.email
          }).then((res) => {
            console.log(res);
            if (res.data.success) {
              // Redirect to payment success
              window.location.href = `${process.env.REACT_APP_FRONTEND_BASE_URL}/paymentsuccess?referenceid=${res.data.referenceId}`;
            }
          });
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during the payment process.");
    }
  };
  

export default handlePayment