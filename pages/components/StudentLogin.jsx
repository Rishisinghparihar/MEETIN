import React, { useState } from 'react'

const StudentLogin = () => {
  const [show, setShow] = useState('password') 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShow = (e) => {
    e.preventDefault();
    if(show === 'password'){
      setShow("text");
    }
    else{
      setShow("password");
    }
  }
  return (
    <div className="flex justify-center pt-[5rem] items-center transition-all duration-1000 ">
    <div className="rounded-md p-[3.5rem]  shadow-lg dark:bg-blue-900 mt-4 bg-blue-100">
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
            <div className="relative mt-4">
              <div className="relative mb-6">
                <div className="text-xl absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-solid fa-lock text-blue-400"></i>
                </div>
                <input
                  type={show}
                  id="password"
                  name="password"
                  className="text-blue-800 text-sm focus:border-b-4 transition-all duration-300 border-b-2 border-blue-300 bg-blue-100 block w-full pl-10 p-2.5  dark:placeholder:text-blue-300 dark:bg-blue-900 dark:text-blue-200 outline-none"
                  placeholder="Your Password"
                  autoComplete="off"
                />
                <div className="text-base absolute cursor-pointer inset-y-0 right-0 flex items-center pl-3" onClick={handleShow}>
                <i className={`text-blue-400 ${show==='password' ? 'fa-solid fa-eye':'fa-solid fa-eye-slash'} `}></i>
                </div>
              </div>
            </div>
            <span className="text-xs ml-[120px] text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-700">
              Forgot password ?
            </span>
          </div>
        </div>
        <div className="mt-12 flex justify-evenly items-center">
          <button
            type="submit"
            className="font-bold font-Crimson text-lg text-white bg-blue-400 uppercase rounded cursor-pointer hover:bg-blue-300 hover:shadow-3xl hover:text-blue-500 transition-all duration-700 dark:text-white bg-transparent p-2 px-5 dark:bg-blue-700 dark:hover:bg-blue-900"
          >
            login
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default StudentLogin