import { cookies } from "next/headers";

const AuthRedirect = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken;
};

export default AuthRedirect;
