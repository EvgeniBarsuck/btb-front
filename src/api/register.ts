import axios from 'axios';

export async function register(
  email: string,
  password: string,
): Promise<{ accessToken: string }> {
  try {
    const response = await axios.post(`http://localhost:3000/users/register`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
