/* eslint-disable @typescript-eslint/no-explicit-any */
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

//GET SINGLE BLOG===========================================

export const getSingleBlog = async (id: string) => {
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

export const getAllBlogs = async (
  search?: string,
  status?: string,
  currentPage?: number,
  perPage?: number
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/blogs?page=${currentPage}&per_page=${perPage}&`;

    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (status) url += `status=${status}`;

    const res = await fetch(url, {
      credentials: "include",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

//update blog status===========================================

export const updateBlogStatus = async (id: number, status: string) => {
  //   console.log(id, status);
  const token = (await cookies()).get("accessToken")!.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error updating blog status:", error);
    return null;
  }
};
//update blog ===========================================

export const updateBlog = async (id: number, data: any) => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    console.error("No access token found");
    return null;
  }

  try {
    // Laravel method spoofing
    data.append("_method", "PUT");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "PUT", //
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
      body: data,
    });

    const text = await res.json();
    try {
      const data = JSON.parse(text);
      console.log("✅ Blog updated successfully:", data);
      return data;
    } catch {
      console.error("❌ Response is not valid JSON:", text);
      return null;
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return null;
  }
};

//DELETE BLOG===============
export const deleteBlog = async (id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
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
