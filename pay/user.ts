export const Users = [
  "yumaaaaa_#0",
  "chiro0583#0",
];

export const GetPartner = (id: string): string => {
  return Users.filter((user) => user !== id)[0]
};
