export const handleSubmit = async (email, setIsSaved) => {
  try {
    await new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage({ type: 'STORE_EMAIL', payload: email }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else {
            resolve();
            setIsSaved(true);
          }
        });
      } catch (err) {
        reject(err.message);
      }
    });

  } catch (errMessage) {
    console.log(errMessage);
  }finally{
    setIsSaved(true);
  }
};


// export const handleSubmit = async (email,setloading, setError) => {
//     setloading(true)
//     setTimeout(async () => {
//       chrome.runtime.sendMessage({ type: 'STORE_EMAIL', payload: email });
//       setloading(false)
//     }, 500)
//     setError({
//       type: null,
//       message: null,
//     })
// };