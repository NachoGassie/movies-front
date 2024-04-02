import { BaseAuthUrl, SignupUrl } from "@/constants";
import { UserLoginReq, UserLoginResp } from "@/model";
import AxiosClone from 'axios-clone';
import { handleError } from "@/utils";

interface MyResponse{
  idUser: number;
  token: string;
}


export async function loginQuery(user: UserLoginReq): Promise<MyResponse>{
  try {
    const res = (await AxiosClone.post<UserLoginResp>(BaseAuthUrl, user)).data;  
    const {token, user: resUser} = res;
    const { idUser } = resUser;
    return { idUser, token }
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function createUser(user: UserLoginReq): Promise<MyResponse>{
  try {
    const res = (await AxiosClone.post<UserLoginResp>(SignupUrl, user)).data
    const {token, user: resUser} = res;
    const { idUser } = resUser;
    return { idUser, token }
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function updateUser(id: number, user: UserLoginReq, token: string){
  const url = `${BaseAuthUrl}/${id}`
  try {
    await AxiosClone.patch(url, user, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function deleteUser(id: number, token: string){
  const url = `${BaseAuthUrl}/${id}`
  try {
    await AxiosClone.remove(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}