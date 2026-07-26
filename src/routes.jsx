import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Main } from './pages/main';
import { Course } from './pages/course';
import { WorkoutVideo } from './pages/workout-video-page';
import { Profile } from './pages/profile';
import { NotFound } from './pages/not-found';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/*" element={<NotFound />} />

      <Route path="/course/:id" element={<Course />} />

      {/* Приватные роуты - доступны только авторизованным */}
      <Route
        path="/workout-video-page"
        element={
          <ProtectedRoute>
            <WorkoutVideo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
