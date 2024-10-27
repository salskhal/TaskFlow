import { verifyOTP } from "@/services/auth";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import { OTPSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";

export default function OTPForm() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email || ""; // Retrieve the email from the passed state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof OTPSchema>) => {
    setLoading(true);
    console.log(data);
    console.log(email);
    try {
      const result = await verifyOTP({
        otp: data.otp,
        email,
      });
      setMessage(result.message);
      navigate("/verification-success")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {email}
        <Button type="submit" className="w-full  font-semibold ">
          Verify Email
        </Button>
      </form>
    </Form>
  );
}
