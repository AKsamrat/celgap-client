"use server";
import { cookies } from "next/headers";
export const getAllLowJournalForReview = async (
  search?: string,
  currentPage?: number,
  perPage?: number,
) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return console.error("No token found");
  try {
    console.log("Fetching journals for review with params:", {
      search,
      currentPage,
      perPage,
    });
    let url = `${process.env.NEXT_PUBLIC_BASE_API}/reviewer/all-journals?page=${currentPage}&per_page=${perPage}&`;

    if (search) url += `search=${encodeURIComponent(search)}&`;

    const res = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("review data", data);
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};
