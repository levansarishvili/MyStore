// Async function to handle user login
export default async function LoginUser(username, password) {
  try {
    const res = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30,
      }),
    });
    // Check if the response is successful
    if (!res.ok) {
      throw new Error("Password or Username is incorrect");
    }
    const data = await res.json();
    console.log(data);
    const accessToken = data.accessToken;

    // Save accessToken into local storage
    localStorage.setItem("accessToken", accessToken);
    return data;
  } catch (error) {
    console.error(error);
  }
}
