import { create } from "zustand";
import blogService from "../services/blogs";

export const useBlogStore = create((set) => ({
	blogs: [],
	actions: {
		initializeBlogs: async () => {
			const blogs = await blogService.getAll();
			set(() => ({ blogs }));
		},
		createBlog: async (blogObject, user) => {
			const newBlog = await blogService.create(blogObject);
			const blogWithUser = {
				...newBlog,
				user: {
					username: user.username,
					name: user.name,
					id: user.id
				},
			};
			set((state) => ({ blogs: state.blogs.concat(blogWithUser) }));
			return blogWithUser;
		},
		likeBlog: async (blog) => {
			const updatedBlog = await blogService.update(blog.id, {
				...blog,
				likes: blog.likes + 1,
				user: blog.user ? blog.user.id : null,
			});
			set((state) => ({
				blogs: state.blogs.map((b) =>
					b.id === blog.id ? { ...updatedBlog, user: blog.user } : b
				),
			}));
		},
		deleteBlog: async (blog) => {
			await blogService.remove(blog.id);
			set((state) => ({
				blogs: state.blogs.filter((b) => b.id !== blog.id),
			}));
		},
	},
}));

export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlogActions = () => useBlogStore((state) => state.actions);

