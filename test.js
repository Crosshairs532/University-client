const adminPath2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "AdminDash",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "create",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "create-faculty",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "create-student",
      },
    ],
  },
];

const admin = adminPath2.reduce((prev, curr) => {
  if (curr.path && curr.element) {
    prev.push({
      path: curr.path,
      element: curr.element,
    });
  }
  if (curr.children) {
    curr.children.forEach((child) => {
      prev.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return prev;
}, []);

console.log(admin);
