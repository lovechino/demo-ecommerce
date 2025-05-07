import dynamic from "next/dynamic";
import React from "react";

const FeaturedPosts = dynamic(() => import("@/UI/Blog/BlogUI"));
const BlogPage = () => {
  return <FeaturedPosts />;
};

export default BlogPage;
