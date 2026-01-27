/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
// import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: React.FormEvent) => {
  try {
    console.log(userData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    if (result.status === 200) {
      (await cookies()).set("accessToken", result.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.status === 200) {
      (await cookies()).set("accessToken", result.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// export const getCurrentUser = async (id:string) => {
//   const token = (await cookies()).get("accessToken")!.value
//   console.log('token:', token);
//   if (!token) return null;

//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`, {
//       method: "GET",
//        headers: {
//         "Content-Type": "application/json",
//       },

//     });
//     console.log('response:', response);

//     const user = await response.json();
//     return user;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };
export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.log("No token found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) return null;
  const data = await res.json();

  return data;
};

//get all users
export const getAllUsers = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.log("No token found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/allUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) return null;
  const data = await res.json();

  return data;
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      },
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
