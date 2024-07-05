import { TAdminRoute, TUserPath } from "../types";

const routesGenerator = (items: TUserPath) => {
  const adminRoutes = items.reduce((prev: TAdminRoute[], curr: TUserPath) => {
    if (curr.path && curr.element) {
      prev.push({
        path: curr.path,
        element: curr.element,
      });
    }
    if (curr.children) {
      curr.children.forEach((child) => {
        prev.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return prev;
  }, []);
  console.log(adminRoutes);
  return adminRoutes;
};

export default routesGenerator;
