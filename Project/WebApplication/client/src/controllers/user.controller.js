const registerUser = async (redName1, greenName1) => {
  if (!redName1 || !greenName1) {
    throw Error("Names are required");
  }

  try {
    console.log(redName1, greenName1);
    const response = await fetch("http://localhost:4000/login/names", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ redName1, greenName1 }),
    });

    const responseData = await response.json();
    if (!responseData.success) {
      throw Error(responseData.error);
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    throw Error(error.message);
  }
};

const getLiveScore = async () => {
  try {
    const response = await fetch("login/liveScore");

    const responseData = await response.json();
    if (!responseData.success) {
      throw Error(responseData.error);
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    throw Error(error.message);
  }
};

const getFinalScore = async () => {
  try {
    const response = await fetch("login/finalScore");

    const responseData = await response.json();
    if (!responseData.success) {
      throw Error(responseData.error);
    }

    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    throw Error(error.message);
  }
};

export { registerUser, getLiveScore, getFinalScore };
