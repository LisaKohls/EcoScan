export default interface IJWTAccessToken {
  exp: number;
  iat: number;
  UserInfo: {
    username: string;
  };
}
