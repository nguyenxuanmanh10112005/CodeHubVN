export interface ApiResponse<T> {
    code: number;
    message?: string;
    result: T;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    accessToken: string;
    refreshToken: string;
    authorities: string[];
}

export interface LogoutResponse {
    message: string;
    timestamp: string;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface CreateUserResponse {
    username: string;
    email: string;
}

export interface UserDetailResponse {
    id: string;
    username: string;
    email: string;
    university?: string;
    status: UserStatus;
    createdAt?: string;
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BANNED = 'BANNED'
}

export interface PageResponse<T> {
    currentPages: number;
    pageSizes: number;
    totalPages: number;
    totalElements: number;
    result: T[];
}

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    demoUrl?: string;
    linkProduct: string;
    isPublic: boolean;
    mediaList: MediaRequest[];
}

export interface MediaRequest {
    fileName: string;
    url: string;
    fileType: string;
}

export interface ProductDetailResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    demoUrl?: string;
    linkProduct: string;
    viewCount: number;
    isPublic: boolean;
    createdAt: string;
    mediaList: MediaResponse[];
    user?: UserDetailResponse;
}

export interface MediaResponse {
    id: string;
    fileName: string;
    url: string;
    mediaType: string;
}

export interface CreateProductResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    demoUrl?: string;
    linkProduct: string;
    isPublic: boolean;
    createdAt: string;
    mediaList: MediaRequest[];
}

export interface UpdateProductRequest {
    id: string;
    name: string;
    description: string;
    price: number;
    demoUrl?: string;
    linkProduct: string;
    isPublic: boolean;
}

export interface UpdateProductResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    demoUrl?: string;
    linkProduct: string;
    isPublic: boolean;
}

export interface PostDetailResponse {
    id: string;
    title: string;
    content: string;
    author: string;
    link?: string;
    mediaList: MediaResponse[];
    createdAt: string;
}

export interface CreatePostRequest {
    title: string;
    content: string;
    link?: string;
    medias: MediaRequest[];
}

export interface UpdatePostRequest {
    id: string;
    title: string;
    content: string;
    link?: string;
    medias: MediaRequest[];
}

export interface CreatePostResponse {
    id: string;
    title: string;
    content: string;
    link?: string;
    medias: MediaRequest[];
    createdAt: string;
}

export interface UpdatePostResponse {
    id: string;
    title: string;
    content: string;
    link?: string;
}

// Legacy blog interfaces (keeping for compatibility)
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    likes: number;
    comments: number;
    featured?: boolean;
    imageUrl?: string;
}

export interface CreateBlogRequest {
    title: string;
    content: string;
    status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
    featured?: boolean;
    imageUrl?: string;
}

export interface UpdateBlogRequest extends CreateBlogRequest {
    id: string;
}

export interface FileResponse {
    fileName: string;
    fileType: string;
    url: string;
}
