import { UserLoginReq } from "@/model";
import { createUser, loginQuery, updateUser } from "@/service";
import { useStore } from "@/store";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

export function useGetToken(){
  const router = useRouter();
  const saveToken = useAuthStore(state => state.setToken);

  return useMutation({
    mutationFn: (user: UserLoginReq) => loginQuery(user),

    onSuccess: ({idUser, token}) => {
      saveToken(idUser, token);
      router.push('/');
    }
  });
}

export function useSignUp(){
  const router = useRouter();
  const saveToken = useAuthStore(state => state.setToken);

  return useMutation({
    mutationFn: (user: UserLoginReq) => createUser(user),

    onSuccess: ({idUser, token}) => {
      saveToken(idUser, token);
      router.push('/');
    }
  });
}

export function useUpdateUser(){
  const token = useStore(useAuthStore, state => state.token) ?? '';
  const idUser = useStore(useAuthStore, state => state.idUser) ?? -1;
  
  return useMutation({
    mutationFn: (user: UserLoginReq) => updateUser(idUser, user, token),
  });
}