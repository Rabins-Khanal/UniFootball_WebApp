import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function NewsPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=2`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-900'>
        <Spinner size='xl' color='gray' />
      </div>
    );

  return (
    <main className='p-8 flex flex-col max-w-4xl mx-auto min-h-screen bg-gray-900 text-white shadow-lg rounded-lg'>
      <h1 className='text-5xl mt-6 px-4 text-center font-bold tracking-tight lg:text-6xl text-teal-400'>{post && post.title}</h1>

      <div className='flex justify-between text-gray-400 text-base px-4 mt-3 border-b border-gray-700 pb-3'>
        <span className='text-lg font-light'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic text-lg font-light'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div className='relative w-full max-w-3xl mx-auto mt-6 rounded-lg overflow-hidden shadow-lg'>
        <img
          src={post && post.image}
          alt={post && post.title}
          className='w-full h-auto max-h-[500px] object-contain rounded-lg'
        />
      </div>

      <div className='mt-6 px-6 text-lg leading-relaxed text-gray-300 bg-gray-800 p-6 rounded-lg shadow-md font-light tracking-wide border border-gray-700'>
        <div dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
      </div>

      <div className='mt-10 px-6 py-6 bg-gray-850 rounded-lg shadow-md border border-gray-700'>
        <CommentSection postId={post._id} />
      </div>

      <div className='flex flex-col justify-center items-center mt-12'>
        <h2 className='text-3xl font-semibold uppercase tracking-wide text-teal-400 border-b border-gray-700 pb-2'>Recent Articles</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6 w-full max-w-7xl mx-auto px-4'>
          {recentPosts && recentPosts.map((post) => (
            <div key={post._id} className='w-full p-0'>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}