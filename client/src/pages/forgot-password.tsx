import { Link } from "wouter";
import { useState } from "react";
import { KeyRound, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { AuthLayout } from "@/components/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import logoImg from "@assets/bbf879acd9f44e0c79ce814e1cdd671d_20a609f8-5788-40ac-8b88-139c3_1772170480092.png";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => setIsSubmitted(true), 600);
    }
  };

  return (
    <AuthLayout>
      <div className="glass-panel rounded-3xl p-8 sm:p-10 w-full border-t border-white/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to sign in
        </Link>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-4 py-6"
          >
            <div className="bg-green-500/20 p-4 rounded-full border border-green-500/30">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Check your email</h2>
            <p className="text-muted-foreground text-sm font-medium max-w-[280px]">
              We sent a password reset link to <span className="text-white">{email}</span>
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              variant="outline" 
              className="mt-4 w-full glass-input hover:bg-white/10"
            >
              Try another email
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center mb-10 text-center">
              <img 
                src={logoImg} 
                alt="Ledgerly Logo" 
                className="w-72 h-auto mb-4 drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              />
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                Reset Password
              </h1>
              <p className="text-muted-foreground text-sm mt-2 font-medium max-w-[280px]">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80 ml-1">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com" 
                    required
                    className="glass-input h-11 pl-10 rounded-xl"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                Send Reset Link
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
}
