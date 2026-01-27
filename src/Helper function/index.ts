import type { Url } from "next/dist/shared/lib/router/router";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Role = "admin" | "reviewer" | "user" | undefined;

export interface MenuItem {
  name: string;
  href?: string; // optional
  roles: Role[];
  icon?: any;
  children?: MenuItem[]; // optional nested menu
}
export const filterMenu = (items: MenuItem[], role: Role): MenuItem[] => {
  return items
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      children: item.children ? filterMenu(item.children, role) : undefined,
    }));
};
