import axios from "axios";

export async function login(
  email: string,
  password: string
): Promise<{ accessToken: string }> {
  try {
    const response = await axios.post(`http://localhost:3000/users/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
