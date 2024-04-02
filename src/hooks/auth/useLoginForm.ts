'use client'

import { UserLoginReq } from "@/model";
import { UserLoginReqSchema } from "@/schemas/user/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetToken } from "./useAuth";

export default function useLoginForm(){
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UserLoginReq>({
    resolver: zodResolver(UserLoginReqSchema),
  });

  const { mutate: getToken, isPending, error: submitError } = useGetToken();

  const onSubmit: SubmitHandler<UserLoginReq> = async (user) => {
    getToken(user);
  };

  return {
    errors,
    isPending,
    submitError,
    handleSubmit, 
    onSubmit, 
    register, 
  }
}