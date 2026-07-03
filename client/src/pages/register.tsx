import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrendingUp, UserPlus, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useRegister } from "@/hooks/use-auth";
import { AuthLayout } from "@/components/auth-layout";
import { PasswordInput } from "@/components/password-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import logoImg from "@assets/bbf879acd9f44e0c79ce814e1cdd671d_20a609f8-5788-40ac-8b88-139c3_1772170480092.png";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const registerMutation = useRegister();
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerMutation.mutateAsync({ 
        email: data.email, 
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
      });
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        <div className="flex flex-col items-center mb-6">
          <img 
            src={logoImg} 
            alt="Ledgerly Logo" 
            className="w-64 h-auto mb-2 drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          />
          <p className="text-muted-foreground text-xs font-medium">
            Join Ledgerly to start managing today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-white/80 ml-1 text-xs">First Name</Label>
              <Input 
                id="firstName" 
                placeholder="John" 
                className="glass-input h-10 rounded-xl"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-destructive text-[10px] ml-1 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-white/80 ml-1 text-xs">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                className="glass-input h-10 rounded-xl"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-destructive text-[10px] ml-1 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3 h-3" /> {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="phoneNumber" className="text-white/80 ml-1 text-xs">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              type="tel"
              placeholder="+1 (555) 000-0000" 
              className="glass-input h-10 rounded-xl"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-destructive text-[10px] ml-1 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" /> {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-white/80 ml-1 text-xs">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="glass-input h-10 rounded-xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-[10px] ml-1 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-white/80 ml-1 text-xs">Password</Label>
            <PasswordInput 
              id="password" 
              placeholder="••••••••" 
              className="glass-input h-10 rounded-xl"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-[10px] ml-1 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-white/80 ml-1 text-xs">Confirm Password</Label>
            <PasswordInput 
              id="confirmPassword" 
              placeholder="••••••••" 
              className="glass-input h-10 rounded-xl"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-[10px] ml-1 flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <AnimatePresence>
            {errors.root && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-destructive/15 border border-destructive/30 rounded-xl p-3 flex items-start gap-2.5 text-destructive-foreground mt-4 overflow-hidden"
              >
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errors.root.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            type="submit" 
            disabled={registerMutation.isPending}
            className="w-full h-11 mt-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 active:scale-[0.98]"
          >
            {registerMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Create Account <UserPlus className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center border-t border-white/10 pt-4">
          <p className="text-muted-foreground text-xs">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-semibold hover:text-primary transition-colors hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
