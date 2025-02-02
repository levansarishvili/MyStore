"use client";

import { useState } from "react";

// Post edit form
export default function PostEditForm() {
  return (
    <form className="post-edit-form dark:bg-[#313131] fixed z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[80rem] p-32 rounded-2xl border border-[#e9ecef] text-gray-800 text-2xl cursor-pointer transition-all duration-300 bg-[#495057ed] flex flex-col gap-12 items-center justify-center">
      <button className="edit-form-close-btn absolute w-10 shadow-sm shadow-black top-8 right-8 text-[1.4rem] cursor-pointer transition-all duration-300 bg-[#ec5e2a] text-white rounded-lg px-2 py-1 hover:bg-white hover:text-[#ec5e2a]">
        X
      </button>

      <div className="edit-input-wrapper w-full flex gap-12 items-center justify-between">
        <label
          className="label text-white text-3xl font-medium"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="edit-form-input dark:bg-[#4a4a4a] dark:text-white w-[50rem] p-4 outline-none border-2 border-[#495057] transition-all duration-300 rounded-lg focus:border-[#ec5e2a]"
          type="text"
          id="title"
          name="title"
        />
      </div>

      <div className="edit-input-wrapper w-full flex gap-12 items-center justify-between">
        <label
          className="label text-white text-3xl font-medium"
          htmlFor="content"
        >
          Content
        </label>
        <textarea
          className="edit-form-input dark:bg-[#4a4a4a] dark:text-white w-[50rem] p-4 outline-none  border-2 border-[#495057] ransition-all duration-300 rounded-lg focus:border-[#ec5e2a] edit-form-content h-56"
          id="content"
          name="content"
        />
      </div>

      <div className="edit-input-wrapper w-full flex gap-12 items-center justify-between">
        <label
          className="label text-white text-3xl font-medium"
          htmlFor="views"
        >
          Views
        </label>
        <input
          className="edit-form-input dark:bg-[#4a4a4a] dark:text-white w-[50rem] p-4 outline-none border-2 border-[#495057] transition-all duration-300 rounded-lg focus:border-[#ec5e2a]"
          type="number"
          id="views"
          name="views"
        />
      </div>

      <button
        className="btn edit-form-btn w-80 h-16 text-[1.4rem] mt-8"
        type="submit"
      >
        Save Changes
      </button>
    </form>
  );
}
