import { Root as AccordionRoot, Item as AccordionItem, Trigger as AccordionTrigger, Content as AccordionContent } from "@radix-ui/react-accordion";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/WhatIDo.css";
import { config } from "../config";

const skills = [
  {
    key: "develop",
    data: config.skills.develop,
    topBorder: true,
  },
  {
    key: "design",
    data: config.skills.design,
    topBorder: false,
  },
] as const;

const WhatIDo = () => {
  return (
    <Box className="whatIDO">
      <Box className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            &nbsp;I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </Box>
      <Box className="what-box">
        <Box className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          <AccordionRoot type="single" collapsible>
            {skills.map(({ key, data, topBorder }) => (
              <AccordionItem key={key} value={key} className="what-content">
                <div className="what-border1">
                  <svg height="100%">
                    {topBorder && (
                      <line
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="6,6"
                      />
                    )}
                    <line
                      x1="0"
                      y1="100%"
                      x2="100%"
                      y2="100%"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                    />
                  </svg>
                </div>
                <Box className="what-corner" />

                <Box className="what-content-in">
                  <AccordionTrigger className="what-trigger">
                    <Heading as="h3">{data.title}</Heading>
                    <Heading as="h4">{data.description}</Heading>
                  </AccordionTrigger>
                  <AccordionContent className="what-accordion-content">
                    <Text as="p">{data.details}</Text>
                    <Heading as="h5">Skillset & tools</Heading>
                    <Flex className="what-content-flex" gap="1" wrap="wrap">
                      {data.tools.map((tool, index) => (
                        <Box key={index} className="what-tags">
                          {tool}
                        </Box>
                      ))}
                    </Flex>
                  </AccordionContent>
                  <div className="what-arrow"></div>
                </Box>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </Box>
      </Box>
    </Box>
  );
};

export default WhatIDo;
