export const baseURL = import.meta.env.VITE_SERVER_URL;

export const SummaryApi = {
  // Admin Routes
  adminLogin: {
    url: "/api/admin/login",
    method: "post",
  },
  adminAllBlogs: {
    url: "/api/admin/all-blog",
    method: "get",
  },
  adminAllComments: {
    url: "/api/admin/all-comment",
    method: "get",
  },
  adminGetDashData: {
    url: "/api/admin/dash-data",
    method: "get",
  },
  adminDeleteComment: {
    url: "/api/admin/delete-comment",
    method: "post",
  },
  adminApproveComment: {
    url: "/api/admin/approve-comment",
    method: "post",
  },
  // BlogRoutes

  uploadBlog: {
    url: "/api/image/add",
    method: "post",
  },
  allBlogs: {
    url: "/api/image/get",
    method: "get",
  },
  deleteBlogsById: {
    url: "/api/image/delete",
    method: "post",
  },
  togglePublish: {
    url: "/api/image/toggleStatus",
    method: "post",
  },
  addComment: {
    url: "/api/image/add-comment",
    method: "post",
  },
  getBlogComment: {
    url: "/api/image/comment",
    method: "post",
  },
  generate: {
    url: "/api/image/gemini",
    method: "post",
  },
};
