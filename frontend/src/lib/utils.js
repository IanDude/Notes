export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export const saveToken = (t) => localStorage.setItem("token", t);
export const removeToken = () => localStorage.removeItem("token");
export const getToken = () => localStorage.getItem("token");
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};