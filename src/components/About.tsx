import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/About.css";
import { config } from "../config";

const About = () => {
  return (
    <Flex className="about-section" id="about" align="center">
      <Box className="about-me">
        <Heading as="h3" className="title">{config.about.title}</Heading>
        <Text as="p" className="para">
          {config.about.description}
        </Text>
      </Box>
    </Flex>
  );
};

export default About;
