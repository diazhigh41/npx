"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginModal({ open, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const resetForm = () => {
    setError("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreed(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGoogleLogin = async () => {
    setError("");
    const supabase = createClient();
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (googleError) {
      setError("Gagal menghubungkan ke Google. Coba lagi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");

    const supabase = createClient();

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Password dan Confirm Password tidak sama.");
        return;
      }

      if (!agreed) {
        setError("Kamu harus menyetujui Terms & Conditions terlebih dahulu.");
        return;
      }

      setLoading(true);

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      setLoading(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      handleClose();
      router.refresh();
    } else {
      setLoading(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (signInError) {
        // Menampilkan pesan error ASLI dari Supabase supaya kelihatan kendalanya
        setError(signInError.message);
        return;
      }

      handleClose();
      router.refresh();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" suppressHydrationWarning>
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div 
        className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-sm p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        suppressHydrationWarning
      >
        <button 
          type="button" 
          onClick={handleClose} 
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 cursor-pointer"
          suppressHydrationWarning
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          suppressHydrationWarning
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.27-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
          </svg>
          Connect with Google
        </button>

        <p className="text-center text-xs text-gray-400 my-4">
          {isRegister ? "Or register with email" : "Or login with email"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <>
              <input
                type="text"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-[#14B8A6]"
                suppressHydrationWarning
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-[#14B8A6]"
                suppressHydrationWarning
              />
            </>
          )}

          <input
            type="email"
            name="email"
            id="email"
            autoComplete="username"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-[#14B8A6]"
            suppressHydrationWarning
          />
          <input
            type="password"
            name="password"
            id="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-[#14B8A6]"
            suppressHydrationWarning
          />

          {isRegister && (
            <input
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg text-sm px-4 py-2.5 outline-none focus:border-[#14B8A6]"
              suppressHydrationWarning
            />
          )}

          {isRegister && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded border-gray-300 text-[#14B8A6] focus:ring-[#14B8A6]"
                suppressHydrationWarning
              />
              <label htmlFor="terms" className="text-xs text-gray-500">
                I have read and agree to the{" "}
                <span className="text-[#14B8A6] underline cursor-pointer">
                  Terms & Conditions
                </span>
              </label>
            </div>
          )}

          {!isRegister && (
            <div className="text-right">
              <button type="button" className="text-xs text-gray-500 hover:text-[#14B8A6]" suppressHydrationWarning>
                Forgot Password?
              </button>
            </div>
          )}

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#14B8A6] hover:bg-[#119083] disabled:bg-gray-300 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer mt-2"
            suppressHydrationWarning
          >
            {loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            type="button" 
            onClick={() => {
              setIsRegister(!isRegister);
              resetForm();
            }}
            className="text-[#14B8A6] font-medium hover:underline cursor-pointer"
            suppressHydrationWarning
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
