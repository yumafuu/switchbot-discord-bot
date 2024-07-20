import config from "../config.ts";

export const Users = [
  config.DiscordUser1Id,
  config.DiscordUser2Id,
];

export const GetPartner = (id: string): string => {
  return Users.filter((user) => user !== id)[0];
};

export const GetMe = (id: string): string => {
  return Users.filter((user) => user === id)[0];
};
