import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Recycle, Mail, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface LoginProps {
  onLogin: (email: string, name: string) => void;
  onBackToLanding?: () => void;
}

export function Login({ onLogin, onBackToLanding }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate login - in production, this would make an API call
    // Extract name from email for demo
    const name = email.split("@")[0];
    toast.success("Login successful!");
    onLogin(email, name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          {onBackToLanding && (
            <div className="p-4 pb-0">
              <motion.button
                whileHover={{ x: -5 }}
                onClick={onBackToLanding}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>
            </div>
          )}
          <CardHeader className="text-center space-y-4">
            <motion.div 
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <img src="/logo.png" alt="EcoCollect Logo" className="w-20 h-20" />
            </motion.div>
            <div>
              <CardTitle>EcoCollect Waste Manager</CardTitle>
              <CardDescription>
                Sign in to your citizen portal
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Sign In
                </Button>
              </motion.div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-green-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </form>

            {onBackToLanding && (
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={onBackToLanding} className="text-green-600 hover:underline">
                    Sign up
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}