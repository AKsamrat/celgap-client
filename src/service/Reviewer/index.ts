/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const submitJournalComment = async (data: any, id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token, data);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviewer/${id}/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: data,
      },
    );

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//GET SINGLE Journal Review===========================================

export const getSingleJournalReview = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(id);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/journals/${id}/reviews`,
      {
        method: "GET",
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
