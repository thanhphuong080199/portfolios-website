import { PropsWithChildren } from "react";
import { Box, Heading } from "@radix-ui/themes";
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
            <Heading as="h2">Hello! I'm</Heading>
            <Heading as="h1">
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </Heading>
          </Box>
          <Box className="landing-info">
            <Heading as="h3">An</Heading>
            <Heading as="h2" className="landing-info-h2">
              <div className="landing-h2-1">AI Engineer</div>
            </Heading>
            <Heading as="h2">
              <div className="landing-h2-info">Full-Stack Developer</div>
            </Heading>
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
