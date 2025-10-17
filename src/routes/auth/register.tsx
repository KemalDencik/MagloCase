/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerFormSchema } from "@/api/models";
import { useRegisterUser } from "@/api/queries";
import CustomFormField from "@/components/CustomFormField/CustomFormField";
import CustomTextInput from "@/components/CustomTextInput.tsx/CustomTextInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import z from "zod";
import loginImage from "public/assets/loginImage.png";
import CustomPasswordInput from "@/components/CustomPasswordInput/CustomPasswordInput";

export const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const {
    isPending: registerIsPending,
    isError: registerIsError,
    mutate,
  } = useRegisterUser();

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        navigate({ to: "/auth/login" });
        toast({
          title: "Success",
          description: "Your account has been created successfully.",
        });
      },

      onError: (e: any) => {
        const apiError = e?.response?.data;

        if (apiError?.details && Array.isArray(apiError.details)) {
          apiError.details.forEach((err: any) => {
            form.setError(
              err.field as keyof z.infer<typeof registerFormSchema>,
              {
                message: err.message,
              }
            );
          });
          toast({
            title: "Validation Error",
            description: "Please correct the highlighted fields and try again.",
          });
          return;
        }

        toast({
          title: "Registration Failed",
          description:
            apiError?.message || e.message || "An unexpected error occurred.",
        });
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden">
      {/* SOL TARAF - FORM */}
      <div className="flex flex-col justify-center items-center bg-white px-8 md:px-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create new account
            </h1>
            <p className="text-gray-500">
              Welcome back! Please enter your details
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Fullname */}
              <CustomFormField
                control={form.control}
                name="fullName"
                label="FullName"
              >
                {(field) => (
                  <CustomTextInput
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => field.onChange(e)}
                    {...field}
                    disabled={registerIsPending}
                  />
                )}
              </CustomFormField>

              {/* Email */}
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <CustomTextInput
                    type="text"
                    placeholder="example@mail.com"
                    onChange={(e) => field.onChange(e)}
                    {...field}
                    disabled={registerIsPending}
                  />
                )}
              </CustomFormField>

              {/* Password */}
              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
              >
                {(field) => (
                  <CustomPasswordInput
                    placeholder="••••••••"
                    disabled={registerIsPending}
                    {...field}
                  />
                )}
              </CustomFormField>

              <Button
                type="submit"
                className="w-full bg-[#C8EE44] text-black font-semibold disabled:opacity-60 rounded-xl"
                disabled={registerIsPending}
              >
                {registerIsPending ? "Creating..." : "Create Account"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 font-medium rounded-xl h-12 hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                <span>Sign up with Google</span>
              </Button>

              <p className="text-center text-gray-500 mt-4">
                Already have an account ?{" "}
                <span
                  onClick={() => navigate({ to: "/auth/login" })}
                  className="relative text-black font-medium cursor-pointer inline-block"
                >
                  Sign in
                  <svg
                    className="absolute left-0 bottom-[-6px] w-full h-[8px]"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,6 Q50,0 100,6"
                      stroke="#C8EE44"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </p>

              {registerIsError && (
                <div className="text-red-600 text-center mt-4">
                  An error occurred during register.
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* SAĞ TARAF - GÖRSEL */}
      <div className="hidden md:block relative w-full h-full">
        <img
          src={loginImage}
          alt="Login illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/auth/login")({
  component: RegisterPage,
});
