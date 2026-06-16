import { PropsWithChildren } from "react";
import { Box, Heading } from "@radix-ui/themes";
import "./styles/Landing.css";
import { config } from "../config";
import { useTranslation } from "react-i18next";

const Landing = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <Box className="landing-section" id="landingDiv">
        <Box className="landing-container">
          <Box className="landing-intro">
            <Heading as="h2">{t('landing.greeting')}</Heading>
            <Heading as="h1">
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </Heading>
          </Box>
          <Box className="landing-info">
            <Heading as="h3">{t('landing.an')}</Heading>
            <Heading as="h2" className="landing-info-h2">
              <div className="landing-h2-1">{t('landing.role1')}</div>
            </Heading>
            <Heading as="h2">
              <div className="landing-h2-info">{t('landing.role2')}</div>
            </Heading>
          </Box>
          <Box className="mobile-photo">
            <img src={`${import.meta.env.BASE_URL}images/mypicnbg.png`} alt="Redoyanul Haque" />
          </Box>
        </Box>
        {children}
      </Box>
    </>
  );
};

export default Landing;
