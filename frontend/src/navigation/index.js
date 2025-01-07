import { allNav } from "./allNav";

export const getNav = (role) => {
  console.log(role);
  return allNav.filter((nav) => nav.role.includes(role));
};
