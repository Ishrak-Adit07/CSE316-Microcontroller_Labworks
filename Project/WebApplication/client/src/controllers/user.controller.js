const registerUser = async (redName1, greenName1) => {
  if (!redName1 || greenName1) {
    throw Error("Names are required");
  }

  try {
    const response = await fetch("/api/user/login/names", {
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
    const response = await fetch("/api/user/login/liveScore");

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
    const response = await fetch("/api/user/login/finalScore");

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
