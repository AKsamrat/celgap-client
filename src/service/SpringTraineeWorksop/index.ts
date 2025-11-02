/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const createSpringTraineeWorkshop = async (data: any) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token, data);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/spring-workshop-trainees`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: data,
      }
    );

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

//GET SINGLE SpringTraineeWorkshop===========================================

export const getSingleSpeaker = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/spring-workshop-trainees/${id}`,
      {
        method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        //   credentials: "include",
        //   body: data,
      }
    );

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllSpringTraineeWorkshop = async (
  search?: string,
  currentPage?: number,
  perPage?: number
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/spring-workshop-trainees?page=${currentPage}&per_page=${perPage}&`;

    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await fetch(url, {
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

//update SpringTraineeWorkshop ===========================================

export const updateSpringTraineeWorkshop = async (
  id: number,
  formData: FormData
) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.error("No token found");
  console.log(id, token);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/spring-workshop-trainees/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error saving blog:", error);
    return null;
  }
};

//DELETE SpringTraineeWorkshop===============
export const deleteSpringTraineeWorkshop = async (id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/spring-workshop-trainees/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error: any) {
    return Error(error);
  }
};
