import { useNavigate } from "react-router-dom";

const Error = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold text-[#276100] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#276100] text-white px-6 py-2 rounded-lg hover:bg-green-950 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  )
}

export default Error
