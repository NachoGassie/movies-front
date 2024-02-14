import { BaseAuthUrl } from "@/constants";
import { UserLoginReq, UserLoginResp } from "@/model";

export async function loginQuery(user: UserLoginReq): Promise<string>{
  const res = await fetch(BaseAuthUrl, {
    method: "POST", 
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json: UserLoginResp = await res.json();

  return json.token;
}