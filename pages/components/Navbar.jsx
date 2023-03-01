import React from "react";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/router";
import Checkbox from "./Checkbox";
const Navbar = () => {

  const router = useRouter();
  return (
    <>
      <div className="bg-slate-200 dark:bg-slate-800 nav transition-all duration-300">
        <div className="flex justify-between items-center p-1 px-6 lg:px-0 container mx-auto">
          <Link href={"/"}>
            <div className=" flex text-lg font-bold uppercase">
              <Image src="/images/logo.png" alt="..." height={64} width={64}/>
              <p className="pt-4 dark:text-white"> GURU-COOL</p>
            </div>
          </Link>
          <input
            type="checkbox"
            name="hamburger"
            className="peer hidden"
            id="hamburger"
          />
          <label
            htmlFor="hamburger"
            className="peer-checked:hamburger block relative cursor-pointer lg:hidden border-2 border-gray-300 peer-checked:border-2 peer-checked:border-white p-3 rounded-md transition-all "
          >
            <div className="m-auto w-6 h-0.5 rounded bg-gray-300 transition-all duration-300"></div>
            <div className="m-auto mt-2 w-6 h-0.5 rounded bg-gray-300 transition-all duration-300"></div>
          </label>

          <div className="translate-y-full peer-checked:translate-y-0 -mr-[35rem] lg:translate-y-0 inset-0 fixed lg:static pt-20 lg:pt-0 bg-white lg:bg-transparent -z-10 lg:z-10 lg:h-auto transition-all duration-300 ease-in-out ">
            <div className="bg-white shadow-md lg:bg-transparent lg:shadow-none py-10 lg:py-0 ml-[6rem] flex flex-col lg:items-center lg:flex-row px-6 space-y-4 lg:space-y-0 lg:space-x-12">
              <Link legacyBehavior href={"/"}>
                <a
                  className={
                    router.pathname == "/"
                      ? "text-xl text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                      : "text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                  }
                >
                  Home
                </a>
              </Link>
              <Link legacyBehavior href={"/about"}>
                <a
                  className={
                    router.pathname == "/about"
                      ? "text-xl text-black lg:text-gray-500 hover:text-gray-300 transition-all "
                      : "text-black lg:text-gray-500 hover:text-gray-300 transition-all "
                  }
                >
                  About
                </a>
              </Link>
              <Link legacyBehavior href={"/login"}>
                <a
                  className={
                    router.pathname == "/login"
                      ? "text-xl text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                      : "text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                  }
                >
                  Login
                </a>
              </Link>
              <Link legacyBehavior href={"/register"}>
                <a
                  className={
                    router.pathname == "/register"
                      ? "text-xl text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                      : "text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                  }
                >
                  Register
                </a>
              </Link>
              <Link legacyBehavior href={"/contact"}>
                <a
                  className={
                    router.pathname == "/contact"
                      ? "text-xl text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                      : "text-black lg:text-gray-500 hover:text-gray-300 transition-all"
                  }
                >
                  Contact
                </a>
              </Link>
            </div>
          </div>
            <Checkbox />
        </div>
      </div>
    </>
  );
};

export default Navbar;
