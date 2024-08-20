import { Link } from 'react-router-dom';
import errorImg from '../assets/images/error.png';

const Error = () => {
  return (
    <div style={{backgroundImage: `url(${errorImg})`}} className='w-full relative bg-no-repeat bg-center bg-cover h-screen flex items-center justify-center'>
        <Link to={'/'} className='absolute bottom-[4rem] right-[4rem] bg-red-600 font-bold text-xl text-white px-6 py-2 hover:scale-95 duration-500'>Go Back!</Link>
    </div>
  )
}

export default Error
