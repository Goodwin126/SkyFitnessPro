import styled from 'styled-components';

const StyledCourseBanner = styled.div`
  background-color: ${props => props.$bgColor || '#eff1f1'};
  position: relative;
  height: 400px;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
`;

const StyledImgCourse = styled.img`
  position: absolute;

  top: ${props => props.$styles?.top || '-100px'};
  right: ${props => props.$styles?.right || '0'};
  width: ${props => props.$styles?.width || '100%'};
  height: ${props => props.$styles?.height || 'auto'};

  object-fit: cover;
`;

const StyledNameCourse = styled.h1`
  font-weight: 500;
  font-size: 60px;
  line-height: 72px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 40px;
  left: 40px;
  margin: 0;
  z-index: 2;
`;

export default function CourseBanner({
  nameCourse,
  imageSrcCourse,
  colorCourse,
  bannerStyles,
}) {
  return (
    <StyledCourseBanner $bgColor={colorCourse}>
      <StyledImgCourse
        src={imageSrcCourse}
        alt={`${nameCourse} Banner`}
        $styles={bannerStyles}
      />
      <StyledNameCourse>{nameCourse}</StyledNameCourse>
    </StyledCourseBanner>
  );
}
