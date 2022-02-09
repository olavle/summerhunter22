const baseUrl = 'http://localhost:3000';

export const postQuery = async (body: unknown) => {
  console.log('This is body:', body);
  const loginResult = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  const loginToJson = await loginResult.json();
  return loginToJson;
};
