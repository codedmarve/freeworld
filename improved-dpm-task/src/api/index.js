const baseURL = "http://localhost:5000/api";

// Posts APIs
const postAudio = async (result) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: result,
  };

  const response = await fetch(`${baseURL}/posts`, requestOptions);
  console.log(response);
};

export { postAudio };
