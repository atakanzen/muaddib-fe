import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useState,
  useTransition,
} from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { authenticate } from "../lib/main";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const { login } = useAuth();
  let navigate = useNavigate();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!isLogin) {
      const password = passwordRef.current?.value || "";
      const confirmPassword = confirmPasswordRef.current?.value || "";

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    startTransition(async () => {
      const authEndpoint = isLogin ? "auth/login" : "auth/register";
      try {
        const bearer = await authenticate(authEndpoint, {
          username: usernameRef.current?.value || "",
          password: passwordRef.current?.value || "",
        });

        login(bearer);
        navigate("/");
      } catch (error: any) {
        setError(error.message);
      }
    });
  };

  const handleOnChange: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-serif font-bold text-5xl mb-4">Muad'dib</h1>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={handleSubmit}
          onChange={handleOnChange}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your Username"
              required
              name="username"
              ref={usernameRef}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter your password"
              required
              name="password"
              ref={passwordRef}
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="bg-white mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                placeholder="Confirm your password"
                required
                name="confirmPassword"
                ref={confirmPasswordRef}
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full"
            variant="default"
            disabled={isPending}
            size="lg"
          >
            {isPending && <LoaderCircleIcon className="animate-spin" />}
            {isPending ? null : isLogin ? "Login" : "Sign Up"}
          </Button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-amber-600 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-amber-600 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
