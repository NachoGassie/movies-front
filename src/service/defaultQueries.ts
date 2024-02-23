import { handleError } from "@/utils";

export async function createOne(url: string, formData: FormData, token: string){
  const res = await fetch(url, {
    method: "POST", 
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!res.ok) {
    throw new Error(handleError((await res.json()).error));
  }
  return res;
} 
export async function updateOne(url: string, formData: FormData, token: string){
  const res = await fetch(url, {
    method: "PUT", 
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!res.ok) {
    throw new Error(handleError((await res.json()).error));
  }
  return res;
}
export async function deleteOne(url: string, token: string){
  const res = await fetch(url, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error(handleError((await res.json()).error));
  }
  return res;
}