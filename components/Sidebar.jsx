"use client";
import { useState } from "react";
import { TbLoaderQuarter } from "react-icons/tb";
import {
  HiOutlineDocument,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiOutlineTrash,
} from "react-icons/hi";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  DocLoading,
  setDocLoading,
}) {
  const [files, setFiles] = useState([]);
  const [APIResponse, setAPIResponse] = useState("");

  const handleChange = (e) => {
    setFiles(e.target.files);

    // const docs = e.target.files;
    // for (let doc of docs) {
    //   setFiles((prev) => [...prev, doc]);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDocLoading(true);
    const data = new FormData();
    [...files].forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      setAPIResponse(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setFiles([]);
      setDocLoading(false);
    }
  };

  return (
    <>
      {!sidebarOpen ? (
        <button
          className={`fixed  z-10 flex items-center cursor-pointer left-10 top-6 ${
            sidebarOpen ? "translate-x-{400px]" : "-translate-x-full"
          } ease-in-out duration-500`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HiChevronDoubleRight size={30} className="text-gray-400" />
        </button>
      ) : (
        <button
          className="text-4xl text-white items-center cursor-pointer fixed left-[350px] top-4 z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HiChevronDoubleLeft size={30} className="text-white" />
        </button>
      )}
      <div
        className={`top-0 left-0 fixed bg-slate-900 w-[400px] h-full pt-36 px-5
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ease-in-out duration-500`}
      >
        <h1 className="text-white text-xl mb-3">Upload PDFs first</h1>
        {/* Drag and Drop Box */}
        <div className="max-w-xl">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-medium text-gray-600">
                <span>Drop files to Attach, or </span>
                <span className="text-blue-600 underline">browse</span>
                <p className="text-xs">Limit 200MB per file</p>
              </span>
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              accept="application/pdf"
              onChange={handleChange}
            />
          </label>
        </div>
        {/* Drag and Drop Box End*/}
        <div className="flex flex-col items-center w-full ">
          <ul className="my-5 max-h-[300px] overflow-y-scroll w-full px-2">
            {[...files].map((f, idx) => (
              <li key={idx}>
                <div className="flex justify-between items-center w-full gap-x-4">
                  <div>
                    <HiOutlineDocument className="text-gray-400 h-5 w-5" />
                  </div>
                  <div className="grow text-gray-400 truncate ...">
                    <p className=" text-start text-sm truncate ...">{f.name}</p>
                    <small className=" text-start text-xs">
                      {(f.size / 1000).toFixed(1)} KB
                    </small>
                  </div>
                  <div className="justify-self-end">
                    <HiOutlineTrash
                      className="text-red-400 h-5 w-5 cursor-pointer"
                      onClick={() =>
                        setFiles([...files].filter((f, i) => i !== idx))
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {files.length === 0 ? (
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
              Submit
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white w-fit font-bold py-2 px-4 border border-blue-700 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
          {APIResponse.success ? (
            <div className="text-sm text-green-500 mt-5">
              {APIResponse?.success}
            </div>
          ) : APIResponse.error ? (
            <div className="text-sm text-red-400 mt-5">
              {APIResponse?.error}
            </div>
          ) : null}
        </div>
      </div>
      {DocLoading ? (
        <div
          className={`top-0 left-0 fixed bg-gray-900 w-[400px] h-full z-20 opacity-50 flex justify-center items-center`}
        >
          <TbLoaderQuarter color="red" className="animate-spin h-48 w-48" />
        </div>
      ) : null}
    </>
  );
}
