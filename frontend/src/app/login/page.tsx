import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function login() {
  return (
    <div className="flex min-h-screen flex-col items-center px-12 pt-[160px] justify-center">
      <GoogleLoginButton />
    </div>
  );
}
