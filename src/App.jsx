import { AppRoutes } from './routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCouses } from './store/coursesSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCouses());
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="px-[16px] md:px-[140px] pt-[40px] md:pt-[50px] pb-0 md:pb-20">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
