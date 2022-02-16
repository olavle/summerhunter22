const baseUrl = 'http://localhost:3000';

export const postQuery = async (body: unknown) => {
  const result = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });
  const resultToJson = await result.json();
  return resultToJson;
};

// export const getQuery = async (body: unknown) => {
//   const result = await fetch('http://localhost:3000/', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   const resultToJson = await result.json();
//   return resultToJson;
// };
