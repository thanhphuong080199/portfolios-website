import { Box } from "@radix-ui/themes";
import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <Box className="about-section" id="about">
      <Box className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <p className="para">
          {config.about.description}
        </p>
      </Box>
    </Box>
  );
};

export default About;
