"use client";
import { GetAllBlog } from "@/Apis/Blog";
import { baseURL } from "@/Utils/Axios";
import { Article } from "@/Utils/type";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const POSTS_PER_PAGE = 6;

const Featuredlist = () => {
  const [list, setList] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetAllBlog();
      setList(res);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = list.slice(startIndex, endIndex);
  const totalPages = Math.ceil(list.length / POSTS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white text-gray-900 py-6 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bài viết nổi bật */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Bài viết nổi bật</h2>
        {list[0] && (
          <div className="relative w-full overflow-hidden rounded-xl shadow">
            <img
              src={`${baseURL}${list[0].gallery}`}
              alt={list[0].title}
              className="w-full object-cover"
            />
            <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow p-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Xem nhiều nhất */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Xem nhiều nhất</h2>
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <div className="flex gap-4" key={post.id}>
              <img
                src={`${baseURL}${post.gallery}`}
                alt={post.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium line-clamp-2">{post.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.date_post).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Tiếp
          </button>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className={`
          fixed z-50 bg-gray-400 text-white p-3 rounded-full shadow-lg
          transition-all duration-300 hover:bg-gray-500
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          md:bottom-8 md:right-8
          bottom-20 right-4
        `}
        style={{ zIndex: 100 }}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
};

export default Featuredlist;
