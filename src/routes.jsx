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

      <Route path="/course/:id" element={<Course />} />

      <Route
        path="/course/:courseId/workout-video-page/:id"
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
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
