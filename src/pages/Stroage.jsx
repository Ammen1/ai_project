import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";

const Stroage = () => {
  function slugify(string) {
    const a =
      "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b =
      "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
  const history = useNavigate();
  const initialFormData = Object.freeze({
    imageName: "",
  });

  const [postData, updateFormData] = useState(initialFormData);
  const [postimage, setPostImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      setPostImage((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else if (name === "imageName") {
      updateFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value.trim(),
        id: slugify(e.target.value.trim()),
      }));
    } else {
      updateFormData((prevState) => ({
        ...prevState,
        [name]: e.target.value.trim(),
      }));
    }
  };

  useEffect(() => {
    let timer;

    if (showProgressBar) {
      timer = setTimeout(() => {
        setShowProgressBar(false);
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }

    return () => clearTimeout(timer);
  }, [showProgressBar]);

  useEffect(() => {
    let timer;

    if (showProgressBar) {
      timer = setTimeout(() => {
        setShowProgressBar(false);
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }

    return () => clearTimeout(timer);
  }, [showProgressBar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imageName", postData.disease);
      formData.append("user", 1);
      formData.append("image", postimage.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          accept: "application/json",
        },
      };

      await axiosInstance.post("user/predict/", formData, {
        ...config,
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentage);
        },
      });

      setShowProgressBar(true);
      setShowAlert(true); // Show the alert message

      toast.success("Image uploaded successfully! Please wait...");

      setTimeout(() => {
        setShowProgressBar(false);
        setShowAlert(false); // Hide the alert message
        history("/admindashboard");
        window.location.reload();
      }, 5000); // Wait for 5 seconds before redirecting
    } catch (error) {
      // Handle error here
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      toast.error("Error fetching data. Please try again.");
    }
  };

  return (
    <section className="overflow-y-hidden">
      <div className=" grid-cols-3 mt-28   h-screen w-full">
        <div className="bg-gray-800 relative   flex w-full h-full mr-6  flex-col justify-center ">
          <form className="max-w-[400px] w-full  mx-auto rounded-lg  bg-gray-950 p-8 px-8">
            <h2 className="text-3xl  bg-teal-500 text-gradient font-bold text-center">
              upload coffee image
            </h2>

            <div className="flex flex-col text-gray-800 py-2">
              <input
                accept="image/*"
                id="image"
                onChange={handleChange}
                name="image"
                type="file"
              />
              <label htmlFor="original_image text-gradient">add image</label>
            </div>

            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg text-gradient hover:animate-pulse shadow-teal-500/50 text-white font-bold rounded-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </form>
          <div className="max-w-[400px] w-full  mx-auto rounded-lg  bg-gray-950 p-8 px-8">
            {showProgressBar && <ProgressBar progress={progress} />}
            {showAlert}
          </div>

          {/* {showProgressBar && <ProgressBar progress={progress} />} */}
        </div>
        <div className="absolute z-[999] bg-opacity-10 hidden sm:block w-[10%] h-[15%] border-secondary bg-blend-color-dodge mr-15 right-20 bottom-20 blue__gradient rounded-full  animate-spin" />
        {/* gradient end */}
      </div>
      <div className="flex justify-between borde  text-gray-700 py-2">
        <div className="absolute z-[999] hidden sm:block ml-5  w-[20%] h-[10%] top-3/4 blue__gradient rounded-full animate-spin  hover:animate-spin" />
      </div>
    </section>
  );
};

export default Stroage;
