import { Box, Heading, Text } from "@radix-ui/themes";
import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <Box className="about-section" id="about">
      <Box className="about-me">
        <Heading as="h3" className="title">{config.about.title}</Heading>
        <Text as="p" className="para">
          {config.about.description}
        </Text>
      </Box>
    </Box>
  );
};

export default About;
