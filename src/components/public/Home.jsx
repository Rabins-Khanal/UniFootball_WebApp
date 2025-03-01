import { useEffect, useState } from 'react';
import { FaFutbol } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PostCard from '../private/posts/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className='bg-gray-900 text-white min-h-screen px-4 overflow-hidden'>
      <div className='flex flex-col gap-6 py-10 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto text-center'>
        <FaFutbol className='text-4xl sm:text-5xl md:text-6xl text-teal-400 mx-auto' />
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-teal-400'>Welcome to UniFootball</h1>
        <p className='text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed'>
          An app for all ballers!
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm md:text-base text-teal-400 font-semibold hover:underline transition duration-300'
        >
          View all news
        </Link>
      </div>

      <div className='max-w-7xl mx-auto p-4 flex flex-col gap-12 py-8'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-8'>
            <h2 className='text-xl sm:text-2xl font-semibold text-left text-teal-300 border-b border-gray-700 pb-3'>Recent News</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-full justify-start'>
              {posts.map((post, index) => (
                <div key={post._id} className={`w-full p-4 ${index === 0 ? 'col-start-1' : ''}`}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-base sm:text-lg text-teal-400 hover:underline text-center font-medium'
            >
              View all News
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}