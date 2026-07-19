import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Course } from './pages/course';
import { WorkoutVideo } from './pages/workout-video-page';

import { Profile } from './pages/profile';

import { NotFound } from './pages/not-found';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<NotFound />} />

      <Route path="/course/:id" element={<Course />} />

      <Route path="/workout-video-page" element={<WorkoutVideo />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/" element={<Main />} />
    </Routes>
  );
};
