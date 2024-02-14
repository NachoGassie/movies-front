'use client'

import { UserLoginReq } from "@/model";
import { UserLoginReqSchema } from "@/schemas/user/user.schemas";
import { loginQuery } from "@/service";
import { useAuthStore } from "@/store/auth/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from "react-hook-form";

function useGetToken(){
  const router = useRouter();
  const saveToken = useAuthStore(state => state.setToken);

  return useMutation({
    mutationFn: (user: UserLoginReq) => loginQuery(user),

    onSuccess: (token) => {
      saveToken(token);
      router.push('/');
    },
  });
}

export default function useLoginForm(){
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UserLoginReq>({
    resolver: zodResolver(UserLoginReqSchema)
  });

  const { mutate: getToken, isPending } = useGetToken();

  const onSubmit: SubmitHandler<UserLoginReq> = async (user) => {
    getToken(user);
  };

  return {
    errors,
    isPending,
    handleSubmit, 
    onSubmit, 
    register, 
  }
}