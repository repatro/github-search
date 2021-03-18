const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function getHelloWorld(): Promise<string> {
  const response = await fetch(`${API_URL}/helloWorld`);
  if (response.ok) {
    return response.text();
  } else {
    return Promise.reject(new Error('Fetching hello world failed'));
  }
}
