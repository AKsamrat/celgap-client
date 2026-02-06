export const ROUTE_ROLES: Record<string, string[]> = {
  "/admin/news": ["admin", "reviewer", "user"],

  "/admin/publications": ["admin", "user"],
  "/admin/publications/Law-Journal": ["admin", "user"],

  "/admin/events": ["admin"],
  "/admin/events/conferences": ["admin"],
  "/admin/events/spring-school": ["admin"],
  "/admin/events/webinars": ["admin"],
};
