import LoginForm from "@/components/admin/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { loginUser } from "@/service/AuthService";
import { log } from "console";
import toast from "react-hot-toast";

export default function AdminLoginPage() {

  // const logingUserAndGetUser = async (credentials: { email: string; password: string }) => {
  //   try {
  //     const data = await loginUser(credentials);
  //     console.log(data);
  //     if (data) {
  //       const user = await getCurrentUser();
  //       console.log('Current user:', user);
  //       toast.success("Login successful!");
  //       return user;
  //     } else {
  //       toast.error("Invalid email or password");
  //       return null;
  //     }
  //     // router.push("/admin/dashboard")
  //   } catch (err) {
  //     toast.error("Login failed. Please try again.");
  //     return null;
  //   }
  // };
  return <LoginForm />;
}
