import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRoutes } from './routes';

import { loadProfile } from './store/AuthSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-1 overflow-y-auto px-[140px] md:px-4 pt-[50px] md:pt-[40px] pb-20">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
