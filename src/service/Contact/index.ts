/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

//create contact===========================================

export const createContact = async (data: any) => {
  console.log(data);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const datas = await res.json();
    console.log("contact", datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//GET SINGLE contact===========================================

export const getSingleContact = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contacts/${id}`,
      {
        method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        //   credentials: "include",
        //   body: data,
      },
    );

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//get all contacts===========================================

export const getAllContact = async (
  search?: string,
  status?: string,
  currentPage?: number,
  perPage?: number,
) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/contacts?page=${currentPage}&per_page=${perPage}&`;

    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (status) url += `status=${status}`;

    const res = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching Contact:", error);
    return null;
  }
};

//DELETE Contact===============
export const deleteContact = async (id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};
