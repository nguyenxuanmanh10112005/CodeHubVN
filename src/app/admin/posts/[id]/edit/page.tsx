'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { postApi } from '@/services/blog.service';
import { PostDetailResponse, UpdatePostRequest, MediaRequest } from '@/types/api';
import FileUpload from '@/components/shared/FileUpload';
import { FileResponse } from '@/services/file.service';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<FileResponse[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.id) return;

      setIsLoading(true);
      setError('');

      try {
        const response = await postApi.getPost(params.id as string);
        const postData = response.result;
        setPost(postData);
        setFormData({
          title: postData.title,
          content: postData.content,
          link: postData.link || ''
        });

        // Convert existing media to FileResponse format for display
        if (postData.mediaList && postData.mediaList.length > 0) {
          const existingFiles: FileResponse[] = postData.mediaList.map(media => ({
            fileName: media.fileName || 'existing-file',
            fileType: media.mediaType || 'image/jpeg',
            url: media.url
          }));
          setUploadedFiles(existingFiles);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setIsSaving(true);
    setError('');

    try {
      // Prepare media list from uploaded files
      const medias: MediaRequest[] = uploadedFiles.map(file => ({
        fileName: file.fileName,
        url: file.url,
        fileType: file.fileType
      }));

      const updateData: UpdatePostRequest = {
        id: post.id,
        title: formData.title.trim(),
        content: formData.content.trim(),
        link: formData.link.trim() || undefined,
        medias
      };

      await postApi.updatePost(updateData);

      // Show success message and redirect
      alert('Cập nhật bài viết thành công!');
      router.push('/admin/posts');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/posts');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Form skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-12 bg-gray-200 rounded"></div>

              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-32 bg-gray-200 rounded"></div>

              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-12 bg-gray-200 rounded"></div>

              <div className="flex space-x-4">
                <div className="h-12 bg-gray-200 rounded w-24"></div>
                <div className="h-12 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 text-lg font-medium mb-2">Lỗi tải dữ liệu</div>
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={() => router.push('/admin/posts')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa bài viết</h1>
              <p className="mt-2 text-sm text-gray-600">
                Cập nhật thông tin bài viết và nội dung
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Hủy bỏ
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                placeholder="Nhập nội dung bài viết..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Mô tả chi tiết về nội dung bài viết, hướng dẫn hoặc thông tin liên quan.
              </p>
            </div>

            {/* Link */}
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                Liên kết tham khảo
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://example.com/reference-link"
              />
              <p className="mt-2 text-sm text-gray-500">
                Link tham khảo hoặc nguồn bài viết (không bắt buộc).
              </p>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images/Files
              </label>
              <FileUpload
                onFileUploaded={(file) => {
                  setUploadedFiles(prev => [...prev, file]);
                  setError(''); // Clear any existing errors
                }}
                onError={(error) => {
                  setError(error);
                }}
                accept="image/*,video/*,.pdf,.doc,.docx"
                maxSize={50}
                className="w-full"
              />
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current Files:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        {file.fileType.startsWith('image/') ? (
                          <img
                            src={file.url}
                            alt={file.fileName}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <svg className="w-6 h-6 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <p className="text-xs text-gray-500 truncate">{file.fileName}</p>
                            </div>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSaving || !formData.title.trim() || !formData.content.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cập nhật bài viết
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Post Info */}
        {post && (
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin bài viết</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">ID:</span>
                <span className="ml-2 text-gray-600">{post.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Ngày tạo:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}