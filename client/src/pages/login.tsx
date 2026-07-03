import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrendingUp, LogIn, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useLogin } from "@/hooks/use-auth";
import { AuthLayout } from "@/components/auth-layout";
import { PasswordInput } from "@/components/password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import logoImg from "@assets/bbf879acd9f44e0c79ce814e1cdd671d_20a609f8-5788-40ac-8b88-139c3_1772170480092.png";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const loginMutation = useLogin();
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginMutation.mutateAsync(data);
      setLocation("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      }
    }
  };

  return (
    <AuthLayout>
      <div className="glass-panel rounded-3xl p-8 sm:p-10 w-full border-t border-white/20 relative overflow-hidden">
        {/* Subtle inner top highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-10">
          <img 
            src={logoImg} 
            alt="Ledgerly Logo" 
            className="w-80 h-auto mb-4 drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]"
          />
          <p className="text-muted-foreground text-sm font-medium">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80 ml-1">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="glass-input h-11 rounded-xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm ml-1 flex items-center gap-1.5 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <Link href="/forgot-password" className="text-primary text-sm hover:text-primary/80 hover:underline transition-all">
                Forgot password?
              </Link>
            </div>
            <PasswordInput 
              id="password" 
              placeholder="••••••••" 
              className="glass-input"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-sm ml-1 flex items-center gap-1.5 mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.password.message}
              </p>
            )}
          </div>

          <AnimatePresence>
            {errors.root && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="bg-destructive/15 border border-destructive/30 rounded-xl p-3 flex items-start gap-2.5 text-destructive-foreground overflow-hidden"
              >
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{errors.root.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full h-12 mt-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 active:scale-[0.98]"
          >
            {loginMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Sign In <LogIn className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-muted-foreground text-sm">
            Do not have an account?{" "}
            <Link href="/register" className="text-white font-semibold hover:text-primary transition-colors hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
