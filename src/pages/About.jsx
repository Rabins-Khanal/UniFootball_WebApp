export default function About() {
  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-900 text-gray-400 pt-12'>
      <div className='max-w-3xl mx-auto p-6 text-center'>
        <h1 className='text-4xl font-extrabold text-teal-400 my-7'>
          About UniFootball
        </h1>
        <div className='text-lg text-gray-400 flex flex-col gap-6'>
          <p>
            Welcome to <span className='text-teal-400 font-semibold'>UniFootball</span>, your go-to platform for the latest updates, insights, and discussions on football from around the world. Whether you're a die-hard fan or a casual follower, UniFootball is designed to keep you informed and engaged with everything happening in the world of football.
          </p>

          <p>
            Our mission is to bring you accurate and timely news, match analysis, player updates, and transfer rumors—all in one place. We provide a community-driven space where football enthusiasts can discuss their favorite teams, share opinions, and stay up to date with the latest trends in the sport.
          </p>

          <p>
            At UniFootball, we encourage active participation. You can engage with our posts by commenting, liking, and replying to others' thoughts. Our goal is to build a vibrant community where fans from all over the world can come together to share their passion for the game.
          </p>

          <p>
            Stay tuned for weekly articles, in-depth tactical breakdowns, and exclusive content that will enhance your football experience. Thank you for being part of the UniFootball family—let’s celebrate the beautiful game together!
          </p>
        </div>
      </div>
    </div>
  );
}