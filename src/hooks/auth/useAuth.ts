import { UserLoginReq } from "@/model";
import { loginQuery } from "@/service";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

export function useGetToken(){
  const router = useRouter();
  const saveToken = useAuthStore(state => state.setToken);

  return useMutation({
    mutationFn: (user: UserLoginReq) => loginQuery(user),

    onSuccess: (token) => {
      saveToken(token);
      router.push('/');
    }
  });
}