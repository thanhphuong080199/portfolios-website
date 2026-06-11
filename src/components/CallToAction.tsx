import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";
import { Box, Flex } from "@radix-ui/themes";

const CallToAction = () => {
  return (
    <Box className="cta-section">
      <Flex className="cta-buttons" justify="center" wrap="wrap" direction={{ initial: "column", sm: "row" }} gap={{ initial: "3", sm: "5" }}>
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
          Play With Me →
        </Link>

        <a
          href={config.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Hire Me →
        </a>
      </Flex>
    </Box>
  );
};

export default CallToAction;
