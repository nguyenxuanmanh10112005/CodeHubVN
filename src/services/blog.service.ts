import { apiClient } from '@/lib/axios';
import {
    ApiResponse,
    PageResponse,
    PostDetailResponse,
    CreatePostRequest,
    UpdatePostRequest,
    CreatePostResponse,
    UpdatePostResponse,
    BlogPost,
    CreateBlogRequest,
    UpdateBlogRequest
} from '@/types/api';

// Export BlogPost type for external use
export type { BlogPost } from '@/types/api';

// PostAPI - Matching EXACTLY with backend PostController
// Available endpoints: POST, GET, GET/{id}, PUT, DELETE/{id}
export const postApi = {
    // POST /posts - ✅ Available in backend
    createPost: async (data: CreatePostRequest) => {
        const response = await apiClient.post<ApiResponse<CreatePostResponse>>('/posts', data);
        return response.data;
    },

    // GET /posts - ✅ Available in backend
    getAllPosts: async () => {
        const response = await apiClient.get<ApiResponse<PostDetailResponse[]>>('/posts');
        return response.data;
    },

    // GET /posts/{id} - ✅ Available in backend
    getPost: async (id: string) => {
        const response = await apiClient.get<ApiResponse<PostDetailResponse>>(`/posts/${id}`);
        return response.data;
    },

    // PUT /posts - ✅ Available in backend
    updatePost: async (data: UpdatePostRequest) => {
        const response = await apiClient.put<ApiResponse<UpdatePostResponse>>('/posts', data);
        return response.data;
    },

    // DELETE /posts/{id} - ✅ Available in backend
    deletePost: async (id: string) => {
        const response = await apiClient.delete<ApiResponse<void>>(`/posts/${id}`);
        return response.data;
    }

    // ❌ All other methods REMOVED - they don't exist in backend
    // No search, featured, view count endpoints available
    // Frontend should NOT call non-existent endpoints
};

// Legacy blog API - For compatibility only
// Maps to the real postApi endpoints above
export const blogApi = {
    // Map getAllBlogs to getAllPosts
    getAllBlogs: async (params: {
        page?: number;
        size?: number;
        sortBy?: string;
        sortDir?: string;
        keyword?: string;
        status?: string;
    }) => {
        const posts = await postApi.getAllPosts();

        // Convert posts to blog format for compatibility
        const blogs: BlogPost[] = posts.result.map((post: PostDetailResponse) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author || 'Tác giả không xác định', // Use author from backend
            status: 'PUBLISHED' as const,
            publishedAt: post.createdAt,
            createdAt: post.createdAt,
            updatedAt: post.createdAt,
            views: 0, // Backend doesn't track views
            likes: 0, // Backend doesn't track likes
            comments: 0, // Backend doesn't track comments
            featured: false,
            imageUrl: post.mediaList?.[0]?.url
        }));

        return {
            code: 200,
            message: 'Success',
            result: {
                result: blogs,
                totalElements: blogs.length,
                totalPages: 1,
                currentPages: params.page || 1,
                pageSizes: params.size || 10
            }
        };
    },

    // Map getBlog to getPost
    getBlog: async (id: string) => {
        const post = await postApi.getPost(id);

        const blog: BlogPost = {
            id: post.result.id,
            title: post.result.title,
            content: post.result.content,
            author: post.result.author || 'Tác giả không xác định',
            status: 'PUBLISHED',
            publishedAt: post.result.createdAt,
            createdAt: post.result.createdAt,
            updatedAt: post.result.createdAt,
            views: 0,
            likes: 0,
            comments: 0,
            featured: false,
            imageUrl: post.result.mediaList?.[0]?.url
        };

        return {
            code: 200,
            message: 'Success',
            result: blog
        };
    },

    // Map createBlog to createPost
    createBlog: async (data: CreateBlogRequest) => {
        const postData: CreatePostRequest = {
            title: data.title,
            content: data.content,
            link: data.imageUrl || '',
            medias: data.imageUrl ? [{
                fileName: 'featured-image',
                url: data.imageUrl,
                fileType: 'IMAGE'
            }] : []
        };

        const result = await postApi.createPost(postData);

        const blog: BlogPost = {
            id: result.result.id,
            title: result.result.title,
            content: result.result.content,
            author: 'Tác giả không xác định', // For created posts, author not available in response
            status: data.status,
            publishedAt: result.result.createdAt,
            createdAt: result.result.createdAt,
            updatedAt: result.result.createdAt,
            views: 0,
            likes: 0,
            comments: 0,
            featured: data.featured || false,
            imageUrl: data.imageUrl
        };

        return {
            code: 200,
            message: 'Success',
            result: blog
        };
    },

    // Map updateBlog to updatePost
    updateBlog: async (data: UpdateBlogRequest) => {
        const postData: UpdatePostRequest = {
            id: data.id,
            title: data.title,
            content: data.content,
            link: data.imageUrl || '',
            medias: data.imageUrl ? [{
                fileName: 'featured-image',
                url: data.imageUrl,
                fileType: 'IMAGE'
            }] : []
        };

        const result = await postApi.updatePost(postData);

        const blog: BlogPost = {
            id: result.result.id,
            title: result.result.title,
            content: result.result.content,
            author: 'Tác giả không xác định', // For updated posts, author not available in response
            status: data.status,
            publishedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0,
            likes: 0,
            comments: 0,
            featured: data.featured || false,
            imageUrl: data.imageUrl
        };

        return {
            code: 200,
            message: 'Success',
            result: blog
        };
    },

    // Map deleteBlog to deletePost
    deleteBlog: async (id: string) => {
        return await postApi.deletePost(id);
    },

    // Compatibility methods - just return empty
    getPublishedBlogs: async (params: any) => {
        return await blogApi.getAllBlogs({ ...params, status: 'PUBLISHED' });
    },

    getFeaturedBlogs: async (limit: number = 5) => {
        return {
            code: 200,
            message: 'Feature not available in backend',
            result: []
        };
    },

    incrementViewCount: async (id: string) => {
        return {
            code: 200,
            message: 'Feature not available in backend',
            result: null
        };
    },

    searchBlogs: async (query: string, page: number = 0, size: number = 10) => {
        return {
            code: 200,
            message: 'Search not available in backend',
            result: {
                result: [],
                totalElements: 0,
                totalPages: 0,
                currentPages: page,
                pageSizes: size
            }
        };
    }
};