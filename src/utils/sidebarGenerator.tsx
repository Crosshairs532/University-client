import { NavLink } from "react-router-dom";

import { TSidebar, TUserPath } from "../types/sidebar.type";

export const sidebarGenerator = (items: TUserPath, role) => {
  const Sidebar = items.reduce((prev: TSidebar[], curr) => {
    if (curr.name && curr.path) {
      prev.push({
        key: curr.name,
        label: <NavLink to={`/${role}/${curr.path}`}>{curr.name}</NavLink>,
      });
    }
    if (curr.children) {
      prev.push({
        key: curr.name,
        label: curr.name,
        children: curr.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return prev;
  }, []);
  return Sidebar;
};

export default sidebarGenerator;
