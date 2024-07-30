import { NavLink } from "react-router-dom";

import { TSidebar, TUserPath } from "../types/sidebar.type";

export const sidebarGenerator = (items: TUserPath, role: any) => {
  const Sidebar = items.reduce((prev: TSidebar[], curr: any) => {
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
        children: curr.children.map((child: any) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return prev;
  }, []);
  return Sidebar;
};

export default sidebarGenerator;
