export const handleSubmit = async (email,setloading) => {
    setloading(true)
    setTimeout(async () => {
      chrome.runtime.sendMessage({ type: 'STORE_EMAIL', payload: email });
      setloading(false)
    }, 500)
};