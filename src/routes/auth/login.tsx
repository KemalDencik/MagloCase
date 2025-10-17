/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginFormSchema } from "@/api/models";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginImage from "@/assets/loginImage.png";
import CustomFormField from "@/components/CustomFormField/CustomFormField";
import CustomTextInput from "@/components/CustomTextInput.tsx/CustomTextInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import CustomPasswordInput from "@/components/CustomPasswordInput/CustomPasswordInput";
import { LoadingScreen } from "@/components/LoadingScreen";

export const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      form.reset();
      navigate({ to: "/dashboard" });
      toast({
        title: "Success",
        description: "User login successful.",
      });
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err || "An error occurred during login.",
      });
    }
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden">
      {loading && <LoadingScreen message="Signing you in..." />}

      <div className="flex flex-col justify-center items-center bg-white px-8 md:px-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">
              Welcome back! Please enter your details
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
              >
                {(field) => (
                  <CustomTextInput
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={(e) => field.onChange(e)}
                    {...field}
                    disabled={loading}
                  />
                )}
              </CustomFormField>

              <CustomFormField
                control={form.control}
                name="password"
                label="Password"
              >
                {(field) => (
                  <CustomPasswordInput
                    placeholder="••••••••"
                    disabled={loading}
                    {...field}
                  />
                )}
              </CustomFormField>

              <Button
                type="submit"
                className="w-full bg-[#C8EE44] text-black font-semibold disabled:opacity-60 rounded-xl"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
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
                <span>Sign in with Google</span>
              </Button>

              <p className="text-center text-gray-500 mt-4">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate({ to: "/auth/register" })}
                  className="relative text-black font-medium cursor-pointer inline-block"
                >
                  Sign up
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

              {error && (
                <div className="text-red-600 text-center mt-4">
                  {error || "An error occurred during login."}
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

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
  component: LoginPage,
  beforeLoad: () => {
    const token = localStorage.getItem("accessToken");
    if (token) throw redirect({ to: "/dashboard" });
  },
});
