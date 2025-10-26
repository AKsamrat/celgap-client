"use server";
import { cookies } from "next/headers";

export const createBlog = async (data: any) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: data,
    });

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};
export const getAllBlogs = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs${id}`, {
      method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   credentials: "include",
      //   body: data,
    });

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};
