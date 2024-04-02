'use client'

import { User, UserSignupReq } from "@/model";
import { NewUserSignUp } from "@/schemas/user/user.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "./useAuth";

export default function useSignupForm(){
  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<UserSignupReq>({
    resolver: zodResolver(NewUserSignUp),
  });

  const { mutate, isPending, error: submitError } = useSignUp();

  const onSubmit: SubmitHandler<UserSignupReq> = async (user) => {
    mutate(user);
  };

  return {
    errors,
    isPending,
    submitError,
    handleSubmit, 
    onSubmit, 
    register, 
    watch,
  }
}