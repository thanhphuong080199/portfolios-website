import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/Career.css";
import { config } from "../config";

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0]; // Show start year for ranges
  }
  return period; // Single year like "2021"
};

const Career = () => {
  return (
    <Box className="career-section section-container">
      <Box className="career-container">
        <Heading as="h2">
          My career <span>&</span>
          <br /> experience
        </Heading>
        <Box className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <Box key={index} className="career-info-box">
              <Flex className="career-info-in">
                <Box className="career-role">
                  <Heading as="h4">{exp.position}</Heading>
                  <Heading as="h5">{exp.company}</Heading>
                </Box>
                <Heading as="h3">{getDisplayYear(exp.period)}</Heading>
              </Flex>
              <Text as="p">{exp.description}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Career;
