import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const TeacherLogin = () => {
  const [show, setShow] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleShow = (e) => {
    e.preventDefault();
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please Fill all the fields", {
        position: "bottom-center",
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Sorry");
      return;
    }
    try {

      const res = await fetch("/api/loginteacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      toast.success("Login Succesfull", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });

      localStorage.setItem("teacherInfo", JSON.stringify(res));
      setLoading(false);

      router.push("/teacherprofile");
    } catch (error) {
      toast.error("Login Failed, Try Again Later", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);

    }
  };
  return (
    <>
    <ToastContainer
    position="bottom-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    theme="light"
  />
    <div className="flex justify-center pt-[5rem] items-center transition-all duration-1000 ">
      <div className="rounded-md p-[3.5rem]  shadow-lg dark:bg-green-900 mt-4 bg-green-100">
        <form
          method="post"
          className="flex flex-col"
          encType="multipart/form-data"
        >
          <div className="flex">
            <div className="mt-[23px]">
              <div className="relative">
                <div className="relative mb-6 ">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fa-solid fa-envelope  text-green-400"></i>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="text-green-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-green-300 bg-green-100 block w-full pl-10 p-2.5  dark:placeholder:text-green-300 dark:bg-green-900 dark:text-green-200 outline-none"
                    placeholder="Your Email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="relative mt-4">
                <div className="relative mb-6">
                  <div className="text-xl absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="fa-solid fa-lock text-green-400"></i>
                  </div>
                  <input
                    type={show}
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-green-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-green-300 bg-green-100 block w-full pl-10 p-2.5  dark:placeholder:text-green-300 dark:bg-green-900 dark:text-green-200 outline-none"
                    placeholder="Your Password"
                    autoComplete="off"
                  />
                  <div
                    className="text-base absolute cursor-pointer inset-y-0 right-0 flex items-center pl-3"
                    onClick={handleShow}
                  >
                    <i
                      className={`text-green-400 ${
                        show === "password"
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash transition-all duration-1000"
                      } `}
                    ></i>
                  </div>
                </div>
              </div>
              <span className="text-xs ml-[120px] text-green-500 transition-all duration-300 cursor-pointer hover:text-green-700">
                Forgot password ?
              </span>
            </div>
          </div>
          <div className="mt-12 flex justify-evenly items-center">
            <button
              onClick={submitHandler}
              type="submit"
              className="font-bold font-Crimson text-lg text-white bg-green-400 uppercase rounded cursor-pointer hover:bg-green-300 hover:shadow-3xl hover:text-green-500 transition-all duration-700 dark:text-white bg-transparent p-2 px-5 dark:bg-green-700 dark:hover:bg-green-900"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default TeacherLogin;
