import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";
import { Box, Flex } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

const CallToAction = () => {
  const { t } = useTranslation();
  return (
    <Box className="cta-section">
      <Flex className="cta-buttons" justify="center" wrap="wrap" direction={{ initial: "column", sm: "row" }} gap={{ initial: "3", sm: "5" }}>
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
          {t('cta.play')}
        </Link>

        <a
          href={config.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          {t('cta.hire')}
        </a>
      </Flex>
    </Box>
  );
};

export default CallToAction;
