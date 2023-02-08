export const postMessage = (
  message = "",
  setResponse,
  setResponseError,
  setLoader,
  setMessage
) => {
  setLoader(true);
  fetch(`http://192.168.0.102:5000`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      setResponse(data.message);
      if (setMessage) {
        setMessage("");
      }
    })
    .catch((err) => setResponseError(err.message))
    .finally(() => setLoader(false));
};
