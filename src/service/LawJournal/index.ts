/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const createLawJournal = async (data: any) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token, data);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/law-journals`,
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

//GET SINGLE LawJournal===========================================

export const getSingleLawJournal = async (id: string) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/law-journals/${id}`,
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

export const getAllLowJournal = async (
  search?: string,
  currentPage?: number,
  perPage?: number,
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/law-journals?page=${currentPage}&per_page=${perPage}&`;

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
export const getUserAllLowJournal = async (
  search?: string,
  currentPage?: number,
  perPage?: number,
) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/user/law-journals?page=${currentPage}&per_page=${perPage}&`;

    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const updateLawJournal = async (id: number, formData: any) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.error("No token found");
  console.log(id, formData);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/law-journals/${id}`,
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

//update status SpringTraineeWorkshop ===========================================
export const updateLawJournalStatus = async (
  id: number,
  formData: FormData,
) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    console.error("No token found");
    return;
  }

  console.log("Sending:", [...formData.entries()]); //  debug

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/law-journals/${id}/status`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        credentials: "include",
        body: formData, //  correct
      },
    );

    const data = await res.json();
    console.log("Journal", data);
    return data;
  } catch (error) {
    console.error("Error saving Journal:", error);
    return null;
  }
};

//DELETE SpringTraineeWorkshop===============
export const deleteLowJournal = async (id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/law-journals/${id}`,
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

//asign reviewer to law journal=================
export const asignLawJournal = async (data: any) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token, data);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/reviewer/assign`,
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

//provide comment to law journal==================
export const provideCommentToLawJournal = async (data: any, id: number) => {
  const token = (await cookies()).get("accessToken")!.value;
  console.log(token, data);
  if (!token) return console.log("No token found");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/law-journals/${id}/admin-comment`,
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
