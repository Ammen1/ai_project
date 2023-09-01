import React, { useState } from "react";
import axiosInstance from "../axios";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Create = () => {
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
  //

  const history = useNavigate();
  const initialFormData = Object.freeze({
    imageName: "",
  });

  const [postData, updateFormData] = useState(initialFormData);
  const [postimage, setPostImage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imageName", postData.disease);
      formData.append("id", postData.id);
      formData.append("author", 1);
      formData.append("image", postimage.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axiosInstance.post(`user/predict/`, formData, config);
      history("/");
      window.location.reload();
    } catch (error) {
      // Handle error here
      console.error("Error occurred:", error);
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
  };

  return (
    <section className="overflow-y-hidden">
      <div className=" grid-cols-3  h-screen w-full">
        <div className="bg-gray-900 relative flex w-full h-full mr-6  flex-col justify-center ">
          <form className="max-w-[400px] w-full  mx-auto rounded-lg  bg-gray-950 p-8 px-8">
            <h2 className="text-3xl  bg-teal-500 text-gradient font-bold text-center">
              Upload Coffee Image
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>ImageNmae</label>
              <input
                className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                id="imageName"
                label="Disease"
                name="imageName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                accept="image/*"
                id="image"
                onChange={handleChange}
                name="image"
                type="file"
              />
              <label htmlFor="original_image">Upload Original Image</label>
            </div>

            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg text-gradient hover:animate-pulse shadow-teal-500/50 text-white font-bold rounded-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </form>
        </div>
        {/* gradient start */}
        <div className="absolute z-[999] w-[20%] h-[100%] top-0 pink__gradient" />
        <div className="absolute z-[3] w-[20%] h-[100%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[20%] h-[100%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>
      <div className="flex justify-between text-gray-400 py-2"></div>
    </section>
  );
};

export default Create;
