export type MockAdmin = {
  email: string;
  name: string;
  role: "Demo Admin";
};

export type MockSession = {
  admin: MockAdmin;
  createdAt: string;
};
