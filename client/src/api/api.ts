export const get = async (endpoint: string) => {
  const response = await fetch(`http://localhost:5002/api${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const post = async <T>(data: T, endpoint: string): Promise<T> => {
  const response = await fetch(`http://localhost:5002/api${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit the form');
  }
  return response.json() as Promise<T>;
};