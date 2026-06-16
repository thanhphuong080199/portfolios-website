import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/Career.css";
import { config } from "../config";
import { useTranslation } from "react-i18next";

const getDisplayYear = (period: string, nowLabel: string) => {
  if (period.includes("Present")) return nowLabel;
  if (period.includes(" - ")) return period.split(" - ")[0];
  return period;
};

type TranslatedExperience = {
  position: string;
  company: string;
  description: string;
  responsibilities: string[];
};

const Career = () => {
  const { t } = useTranslation();

  const translatedExps = t('experiences', { returnObjects: true }) as TranslatedExperience[];
  const experiences = config.experiences.map((exp, i) => ({ ...exp, ...translatedExps[i] }));

  const careerTitle = t('career.title');
  const [titlePart1, titlePart2] = careerTitle.split('&');

  return (
    <Box className="career-section section-container">
      <Box className="career-container">
        <Heading as="h2">
          {titlePart1}<span>&</span>
          <br />{titlePart2}
        </Heading>
        <Box className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experiences.map((exp, index) => (
            <Box key={index} className="career-info-box">
              <Flex className="career-info-in">
                <Box className="career-role">
                  <Heading as="h4">{exp.position}</Heading>
                  <Heading as="h5">{exp.company}</Heading>
                </Box>
                <Heading as="h3">{getDisplayYear(exp.period, t('career.now'))}</Heading>
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
