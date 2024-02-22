import { BaseAuthUrl, StatusCode } from "@/constants";
import { UserLoginReq } from "@/model";

export async function loginQuery(user: UserLoginReq): Promise<string>{
  const res = await fetch(BaseAuthUrl, {
    method: "POST", 
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === StatusCode.Unauthorized) {
    throw new Error('email y/o contraseña invalido/s');
  }

  const json = await res.json();
  return json.token;
}