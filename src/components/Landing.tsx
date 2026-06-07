import { PropsWithChildren } from "react";
import { Box } from "@radix-ui/themes";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <Box className="landing-section" id="landingDiv">
        <Box className="landing-container">
          <Box className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </Box>
          <Box className="landing-info">
            <h3>An</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">AI Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Full-Stack Developer</div>
            </h2>
          </Box>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <Box className="mobile-photo">
            <img src="/images/mypicnbg.png" alt="Redoyanul Haque" />
          </Box>
        </Box>
        {children}
      </Box>
    </>
  );
};

export default Landing;
