import axios from "axios";
// import { useNavigate } from "react-router";


const handlePayment = async (user)=>{

    // const navigate = useNavigate()

    // console.log(user);
    
    const {data: {order}} = await axios.post("http://localhost:5000/userpayment/checkout", {email: user.email})

    const {data:{key}} = await axios.get("http://localhost:5000/userpayment/getKey") 

    // console.log(key);

    console.log(order);
    

    const options = {
       "key" : key, // Enter the Key ID generated from the Dashboard
        "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "2 Code Daily", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:5000/userpayment/paymentverification",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        },
        "handler": async function (response){
            // Send response to backend for verification
            await axios.post("http://localhost:5000/userpayment/paymentverification", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: user?.email
            }).then((res) => {
                console.log(res);
                if (res.data.success) {
                    window.location.href = `http://localhost:5173/paymentsuccess?referenceid=${res.data.refernceid}&expiry=${res.data.expiriyDate}`
                    // navigate("/paymentsuccess", {state:{refernceid: res.data.refernceid, expiry: res.data.expiriyDate}})
                }
            });
        }
    };
    

    const rzp = new window.Razorpay(options)
    rzp.open()
}

export default handlePayment