export type MockAdmin = {
  username: string;
  name: string;
  role: "Admin";
};

export type MockSession = {
  admin: MockAdmin;
  createdAt: string;
};
