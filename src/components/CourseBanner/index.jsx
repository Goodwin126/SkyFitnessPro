import styled from 'styled-components';

const StyledCourseBanner = styled.div`
  background-color: ${props => props.$bgColor || '#eff1f1'};
  position: relative;
  height: 310px;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;

  @media (max-width: 767px) {
    width: 100%;
    height: 389px;
  }
`;

const StyledImgCourse = styled.img`
  position: absolute;
  height: ${props => props.$styles?.desktop?.height || '520px'};
  top: ${props => props.$styles?.desktop?.top || '0px'};
  right: ${props => props.$styles?.desktop?.right || '0px'};
  object-fit: cover;
  clip-path: polygon(
    ${props => props.$styles?.desktop?.cropLeftPercent || 0}% 0%,
    100% 0%,
    100% 100%,
    ${props => props.$styles?.desktop?.cropLeftPercent || 0}% 100%
  );
  object-position: center;
  display: block;

  @media (max-width: 767px) {
    height: ${props => props.$styles?.mobile?.height || '650px'};
    top: ${props => props.$styles?.mobile?.top || '-210px'};
    right: ${props => props.$styles?.mobile?.right || '0px'};
  }
`;

const StyledNameCourse = styled.article`
  font-weight: 500;
  font-size: 60px;
  line-height: 72px;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 2;

  @media (max-width: 767px) {
    display: none;
  }
`;

export default function CourseBanner({
  nameCourse,
  imageSrcCourse,
  colorCourse,
  bannerStyles,
  bannerStylesforMobileVersion,
}) {
  return (
    <StyledCourseBanner $bgColor={colorCourse}>
      <StyledImgCourse
        src={imageSrcCourse}
        alt={`${nameCourse} Banner`}
        $styles={{
          desktop: bannerStyles,
          mobile: bannerStylesforMobileVersion,
        }}
      />
      <StyledNameCourse>{nameCourse}</StyledNameCourse>
    </StyledCourseBanner>
  );
}
