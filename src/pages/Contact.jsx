import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Contact() {
    return (
        <div className='min-h-screen flex items-start justify-center bg-gray-900 text-gray-400 pt-12'>
            <div className='max-w-3xl mx-auto p-6 text-center'>
                <h1 className='text-4xl font-extrabold text-teal-400 my-7'>
                    Contact Us
                </h1>
                <p className='text-lg text-gray-400 mb-6'>
                    Have questions feedback? We'd love to hear from you! Reach out to us through any of the following channels.
                </p>

                <div className='text-lg text-gray-400 flex flex-col gap-6'>
                    <p>
                        📧 Email: <a href='mailto:support@unifootball.com' className='text-teal-400 hover:underline'>support@unifootball.com</a>
                    </p>

                    <p>
                        📍 Address: 123 Football Street, Sports City, FC 45678
                    </p>

                    <p>
                        📞 Phone: <a href='tel:+1234567890' className='text-teal-400 hover:underline'>+1 (234) 567-890</a>
                    </p>

                    <p>
                        Follow us on social media:
                    </p>
                    <div className='flex justify-center gap-6 text-teal-400 text-2xl'>
                        <a href='#' className='hover:text-gray-300'><FaTwitter /></a>
                        <a href='#' className='hover:text-gray-300'><FaFacebook /></a>
                        <a href='#' className='hover:text-gray-300'><FaInstagram /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
