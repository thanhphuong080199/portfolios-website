import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/About.css";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <Flex className="about-section" id="about" align="center">
      <Box className="about-me">
        <Heading as="h3" className="title">{t('about.title')}</Heading>
        <Text as="p" className="para">
          {t('about.description')}
        </Text>
      </Box>
    </Flex>
  );
};

export default About;
