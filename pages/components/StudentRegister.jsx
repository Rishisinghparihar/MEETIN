import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState("/images/Blank.png");

  const router = useRouter();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warning("Please select an Image", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "meetin");
      data.append("cloud_name", "dkut1is4d");
      fetch("https://api.cloudinary.com/v1_1/dkut1is4d/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.warning("Please select an Image", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !phone || !gender || !password || !confirmpassword) {
      toast.warning("Please Fill all the Fields", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        bodyClassName: "font-bold",
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }
    if (password !== confirmpassword) {
      toast.warning("Passwords not Matched", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }
    try {
      const res = await fetch("/api/registerstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          gender,
          password,
          confirmpassword,
          pic,
        }),
      });
      toast.success("Registration Succesfull", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });

      localStorage.setItem("studentinfo", JSON.stringify(res));
      setLoading(false);

      router.push("/student/studentprofile");
    } catch (error) {
      toast.error("Error Occured, Try Again Later", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
        className: "rounded-full",
      });
      setLoading(true);
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
        theme="dark"
      />
      <div className="flex justify-center items-center transition-all duration-1000 ">
        <div className="rounded-md p-10  shadow-lg dark:bg-blue-900 mt-4 bg-blue-100">
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
                      <i className="fa-solid fa-user  text-blue-400"></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="text-blue-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-blue-300 bg-blue-100 block w-full pl-10 p-2.5  dark:placeholder:text-blue-300 dark:bg-blue-900 dark:text-blue-200 outline-none"
                      placeholder="Your Name"
                      autoComplete="off"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="relative mb-6 ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-envelope  text-blue-400"></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="text-blue-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-blue-300 bg-blue-100 block w-full pl-10 p-2.5  dark:placeholder:text-blue-300 dark:bg-blue-900 dark:text-blue-200 outline-none"
                      placeholder="Your Email"
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="relative mb-6 ">
                    <div className="text-xl absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-phone  text-blue-400"></i>
                    </div>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="text-blue-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-blue-300 bg-blue-100 block w-full pl-10 p-2.5  dark:placeholder:text-blue-300 dark:bg-blue-900 dark:text-blue-200 outline-none"
                      placeholder="Your Number"
                      autoComplete="off"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="relative mt-6 flex flex-col">
                  <label
                    htmlFor="gender"
                    className="text-gray-600 dark:text-blue-100"
                  >
                    Your Gender
                  </label>
                  <div className="flex">
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="male"
                        type="radio"
                        value="male"
                        name="gender"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        className="w-4 h-4 dark:accent-blue-300 text-blue-600 accent-blue-700 bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                      <label
                        htmlFor="male"
                        className="ml-2 mt-1 text-sm font-medium text-gray-600 select-none  dark:text-blue-100"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        className=" dark:accent-blue-300 w-4 h-4 accent-blue-700 text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                      <label
                        htmlFor="female"
                        className="ml-2 mt-1 text-sm font-medium text-gray-600 select-none dark:text-blue-100"
                      >
                        Female
                      </label>
                    </div>
                    <div className="flex items-center mr-4 mt-2">
                      <input
                        id="other"
                        type="radio"
                        value="other"
                        name="gender"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        className="w-4 h-4 rounded-full dark:accent-blue-300 accent-blue-700 text-blue-600 bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                        required
                      />
                      <label
                        htmlFor="other"
                        className="ml-2 mt-1 text-sm font-medium text-gray-600 select-none dark:text-blue-100"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative mt-4">
                  <div className="relative mb-6">
                    <div className="text-xl absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-lock text-blue-400"></i>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="text-blue-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-blue-300 bg-blue-100 block w-full pl-10 p-2.5  dark:placeholder:text-blue-300 dark:bg-blue-900 dark:text-blue-200 outline-none"
                      placeholder="Create Your Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="relative mb-6 ">
                    <div className="text-xl absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="fa-solid fa-key text-blue-400"></i>
                    </div>
                    <input
                      type="password"
                      id="cpassword"
                      name="cpassword"
                      className="text-blue-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-blue-300 bg-blue-100 block w-full pl-10 p-2.5   dark:placeholder:text-blue-300 dark:bg-blue-900 dark:text-blue-200 outline-none"
                      placeholder="Confirm Your Password"
                      autoComplete="off"
                      onChange={(e) => {
                        setConfirmpassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-2xl flex items-center   justify-center flex-col ml-12 shadow-md bg-white dark:bg-slate-600 p-5 w-[250px] h-[350px] mt-[40px]">
                <div className="border-4 overflow-hidden w-[10rem] h-[10rem] rounded-full  shadow-3xl border-blue-300">
                  <img src={src} alt="..." className="h-full w-full" />
                </div>
                <label
                  htmlFor="pic"
                  className="mt-5 border-2 cursor-pointer dark:border-white dark:hover:text-black dark:hover:bg-white border-black p-2 hover:bg-black transition-all rounded-lg hover:text-white"
                >
                  SET PROFILE
                </label>
                <input
                  type="file"
                  id="pic"
                  className="hidden"
                  accept="image/*"
                  name="file"
                  onChange={(e) => {
                    onImageChange(e);
                    postDetails(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="mt-12 flex justify-evenly items-center">
              <button
                type="submit"
                onClick={submitHandler}
                className="font-bold font-Crimson text-lg text-white bg-blue-400 uppercase rounded cursor-pointer hover:bg-blue-300 hover:shadow-3xl hover:text-blue-500 transition-all duration-700 dark:text-white bg-transparent p-2 px-5 dark:bg-blue-700 dark:hover:bg-blue-900"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
