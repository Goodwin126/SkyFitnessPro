import { useSelector } from 'react-redux';
import { selectCourseByIdSelector } from '../store/selectors';

export const useCourseById = courseId => {
  return useSelector(state => selectCourseByIdSelector(state, courseId));
};
