import React, { useEffect, useState } from "react";
import axios from "axios";
import LoaderStudent from "./LoaderStudent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const SelectCard = () => {
  //These radios are for the category that will be selected and send it to the mongo db ok can be my last modify
  const [category, setCategory] = useState("");
  const [button, setButton] = useState(false);
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const router = useRouter();

  const getData = async () => {
    const response = await fetch("/api/fetchCategory");
    setFetchedCategory(await response.json());
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
    if (category === "") {
      setButton(false);
      return button;
    } else {
      setButton(true);
      return button;
    }
  };

  const postCategory = async () => {
    const teacherinfo = await JSON.parse(localStorage.getItem("teacher-info"));
    console.log(teacherinfo);
    try{
    console.log(teacherinfo._id)  
    const data = await fetch(`/api/${teacherinfo._id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "appilcation/json"
      },
      body: JSON.stringify({
        category
      })
    });
    toast.success("Category Added", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });
    // router.push("/teacher/teacherprofile")
  }catch(error){
    toast.error("Category Cannnot Be Added, Please Try Again Later", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });

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
      {isLoading ? (
        <div className="flex justify-center items-center mt-[12rem]">
          <img src="/loader.gif" className="h-20 w-20" alt="loader" />
        </div>
      ) : (
        <div>
          <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl py-10">
            <div className="md:flex">
              <div className="w-full p-3">
                <div className="relative">
                  <i
                    aria-hidden
                    className="absolute fa fa-search text-gray-400 top-5 left-4"
                  />
                  <input
                    type="text"
                    className="bg-white shadow-xl h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer"
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    placeholder="Search Category"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mx-40">
            <ul className="container m-auto grid grid-cols-4  gap-20 mb-36">
              {fetchedCategory
                .filter((val) => {
                  if (query === "") {
                    return val;
                  } else if (
                    val.categoryTitle
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        id={val.categoryLabel}
                        name="category"
                        value={val.categoryTitle}
                        className="hidden peer"
                        onChange={handleChange}
                        key={"header" + val.categoryDescription}
                        required
                      />
                      <label
                        htmlFor={val.categoryLabel}
                        key={val._id}
                        className="inline-flex justify-between items-center transition-all duration-200 p-5 w-full select-none text-gray-500 bg-green-100 peer-checked:shadow-3xl rounded-lg border border-green-400 cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-700 peer-checked:border-2 hover:text-gray-600 hover:bg-green-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                      >
                        <div className="block">
                          <div className="w-full select-none text-xl font-semibold text-center">
                            {val.categoryTitle}
                          </div>
                          <div className="w-full select-none text-center text-sm">
                            {val.categoryDescription}
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}

      {button && (
        <button
          type="submit"
          className="block m-auto border-4 border-green-600 hover:rounded-xl cursor-pointer p-4 transition-all rounded fixed bottom-0  right-[39rem] duration-300 bg-green-300 hover:text-white hover:bg-green-500"
          onClick={postCategory}
        >
          SUBMIT
        </button>
      )}
    </>
  );
};

export default SelectCard;
