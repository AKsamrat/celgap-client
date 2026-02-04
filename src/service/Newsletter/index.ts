/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
//create contact===========================================

import { cookies } from "next/headers";

export const createNewsletter = async (data: any) => {
  console.log(data);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/newsletter/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const datas = await res.json();
    console.log("newsletter", datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//get all contacts===========================================

export const getAllNewsletter = async (
  searchTerm?: string,
  selectedEnquiryType?: string,
  currentPage?: number,
  perPage?: number,
) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/newsletters?page=${currentPage}&per_page=${perPage}&`;

    if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
    if (selectedEnquiryType) url += `enquiry_type=${selectedEnquiryType}`;

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

//DELETE nesletter===============
export const deleteNewsletter = async (id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/newsletters/${id}`,
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
