import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Define local types mapped from the API contract for safety and convenience
type LoginInput = Zod.infer<typeof api.auth.login.input>;
type RegisterInput = Zod.infer<typeof api.auth.register.input>;
type User = any; // Assuming generic user type if not explicitly exported, normally mapped from api.auth.user.responses[200]

export function useUser() {
  return useQuery({
    queryKey: [api.auth.user.path],
    queryFn: async () => {
      const res = await fetch(api.auth.user.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch user");
      return await res.json() as User;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await fetch(api.auth.login.path, {
        method: api.auth.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid email or password");
        }
        throw new Error("An unexpected error occurred. Please try again.");
      }
      return await res.json() as User;
    },
    onSuccess: (user) => {
      queryClient.setQueryData([api.auth.user.path], user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      const res = await fetch(api.auth.register.path, {
        method: api.auth.register.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Invalid registration data");
        }
        throw new Error("An unexpected error occurred. Please try again.");
      }
      return await res.json() as User;
    },
    onSuccess: (user) => {
      // Auto-login on register usually depends on backend, but we'll set the user data just in case
      queryClient.setQueryData([api.auth.user.path], user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.auth.logout.path, {
        method: api.auth.logout.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to logout");
    },
    onSuccess: () => {
      queryClient.setQueryData([api.auth.user.path], null);
      queryClient.invalidateQueries();
    },
  });
}
