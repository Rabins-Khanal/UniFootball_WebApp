import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        setShowMore(data.posts.length === 9);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData({ ...sidebarData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
    if (!res.ok) return;
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    setShowMore(data.posts.length === 9);
  };

  return (
    <div className='flex flex-col w-full p-6 bg-gray-900 text-white'>
      {/* Filter Bar */}
      <form className='flex flex-wrap gap-4 justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md' onSubmit={handleSubmit}>
        <TextInput
          placeholder='Search...'
          id='searchTerm'
          type='text'
          value={sidebarData.searchTerm}
          onChange={handleChange}
          className='w-full md:w-1/3'
        />
        <Select onChange={handleChange} value={sidebarData.sort} id='sort' className='w-full md:w-1/4'>
          <option value='desc'>Newest</option>
          <option value='asc'>Oldest</option>
        </Select>
        <Select onChange={handleChange} value={sidebarData.category} id='category' className='w-full md:w-1/4'>
          <option value='uncategorized'>None</option>
          <option value='Chelsea'>Chelsea</option>
          <option value='Arsenal'>Arsenal</option>
          <option value='Liverpool'>Liverpool</option>
        </Select>
        <Button type='submit' className='w-full md:w-auto'>Apply</Button>
      </form>

      {/* News Section */}
      <div className='mt-6'>
        <h1 className='text-3xl font-semibold border-b border-gray-700 pb-3'>News Results</h1>
        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {!loading && posts.length === 0 && <p className='text-xl text-gray-500'>No posts found.</p>}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading && posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
        {showMore && (
          <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-6 w-full'>
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
