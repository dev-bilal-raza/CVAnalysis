export const verify_token = async (idToken: any) => {
  const response = await fetch('http://localhost:8000/api/v1/token', {
    method: 'POST',
    // mode: "no-cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: idToken }),
  });
  // console.log(response)
  return response;
};
