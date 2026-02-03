"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
//GET SINGLE user===========================================
export const getSingleUser = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      //   body: data,
    });

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//GET ALL Users===========================================

export const getAllUser = async (
  search?: string,
  currentPage?: number,
  perPage?: number,
) => {
  const token = (await cookies()).get("accessToken")!.value;
  //   console.log(token);
  if (!token) return console.log("No token found");
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/allUser?page=${currentPage}&per_page=${perPage}&`;

    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log("all user data", data);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

//update user ===========================================

export const updateUserRole = async (id: number, formData: FormData) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.error("No token found");
  console.log(id, formData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}/role`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      },
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error saving blog:", error);
    return null;
  }
};

//DELETE speakers===============
export const deleteUser = async (id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//update user ===========================================

export const updateUserProfile = async (id: number, formData: FormData) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.error("No token found");
  console.log(id, formData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}/update`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      },
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error saving blog:", error);
    return null;
  }
};
