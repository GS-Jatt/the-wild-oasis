import styled from "styled-components";
import { useDarkModeContext } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
    @media (max-width: 1160px) {
  position: absolute;
  top: 4px;
  left: -10px;
    }
`;

const Img = styled.img`
    height: 9.6rem;
    width: auto;
    @media (max-width: 1160px) {
        height: 8rem;
        clip-path: polygon(
            50% 0%,
            90% 20%,
            100% 60%,
            77% 86%,
            25% 86%,
            15% 60%,
            15% 20%
        );
    }
`;

function Logo() {
  const {isDarkMode}= useDarkModeContext();
  const src = isDarkMode ? '/logo-dark.png' : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
