import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-[#13151f] border border-[#1e2130] mb-6">
          <Search className="h-10 w-10 text-[#6b7280]" />
        </div>
        <h1 className="text-5xl font-bold text-white">404</h1>
        <p className="text-lg text-[#9ca3af] mt-3">Page not found</p>
        <p className="text-sm text-[#6b7280] mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
