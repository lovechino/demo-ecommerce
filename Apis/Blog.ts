import axiosInstance from "@/Utils/Axios";

export const GetAllBlog = async () => {
  return await axiosInstance
    .get("/MobileLogin/GetListItem?language=vi_VN")
    .then((res) => res.data);
};
