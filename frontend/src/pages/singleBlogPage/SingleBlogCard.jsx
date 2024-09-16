import React from "react";
import edjsHTML from "editorjs-html";
import { FaStar } from "react-icons/fa";

const SingleBlogCard = ({ blog }) => {
  const { category, content, coverImg, createdAt, description, rating, title } =
    blog || {};

  //EDITOR JS HTML
  const edjsParser = edjsHTML();
  const html = edjsParser.parse(content).join(" ");

  const date = new Date(createdAt).toDateString();
  const time = new Date(createdAt).toTimeString().slice(0, 8);

  return (
    <>
      <div className="bg-white p-8 text-xs sm:text-sm">
        {/* BLOG HEADER */}
        <div>
          <h1 className="md:text-lg sm:text-md lg:text-xl text-xs font-medium mb-4">
            {title}
          </h1>
          <p className="mb-6 text-sm">
            {`${date} ${time}`} |{" "}
            <span
              className="text-blue-400 cursor-pointer"
              style={{ fontSize: "90%" }}
            >
              {/* THIS NEED TO BE DYNAMIC!!!!!! */}
              Garry Amasia
            </span>
          </p>
        </div>
        <div>
          <img src={coverImg} alt="" className="w-full md:h-[400px] bg-cover" />
        </div>

        {/* //BLOG DETAIL */}
        <div className="mt-8  p-4 text-slate-800 flex flex-col space-y-2">
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className=" flex flex-col space-y-3 editorjsdiv "
          />
          <div className="flex space-x-1 items-center ">
            <span>Rating :</span>
            <div>
              {Array.from({ length: rating }, (_, index) => (
                <span className="mr-0.5" key={index}>
                  <FaStar
                    style={{
                      display: "inline",
                      color: "gold",
                      stroke: "black",
                      strokeWidth: 16,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogCard;
