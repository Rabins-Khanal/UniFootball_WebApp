import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full bg-gray-900 border border-gray-700 hover:border-gray-500 h-[420px] overflow-hidden rounded-lg sm:w-[430px] transition-all shadow-lg'>
      <Link to={`/post/${post.slug}`} className='block'>
        <img
          src={post.image}
          alt='post cover'
          className='h-[250px] w-full object-cover rounded-t-lg transition-all duration-300 group-hover:opacity-90'
        />
      </Link>
      <div className='p-4 flex flex-col gap-3'>
        <span className='text-sm text-gray-400'>{post.category}</span>
        <h2 className='text-lg font-bold text-white line-clamp-2'>{post.title}</h2>
        <Link
          to={`/post/${post.slug}`}
          className='absolute bottom-[-200px] left-0 right-0 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 group-hover:bottom-0'
        >
          Read More
        </Link>
      </div>
    </div>
  );
}