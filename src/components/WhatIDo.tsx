import { Root as AccordionRoot, Item as AccordionItem, Trigger as AccordionTrigger, Content as AccordionContent } from "@radix-ui/react-accordion";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/WhatIDo.css";
import { config } from "../config";
import { useTranslation } from "react-i18next";

const WhatIDo = () => {
  const { t } = useTranslation();

  const skillKeys = ['develop', 'design'] as const;
  const skills = skillKeys.map((key, i) => ({
    key,
    title: t(`skills.${key}.title`),
    description: t(`skills.${key}.description`),
    details: t(`skills.${key}.details`),
    tools: config.skills[key].tools,
    topBorder: i === 0,
  }));

  const part1 = t('whatido.titlePart1');
  const part2 = t('whatido.titlePart2');

  return (
    <Box className="whatIDO">
      <Box className="what-box">
        <h2 className="title">
          {part1[0]}<span className="hat-h2">{part1.slice(1)}</span>
          <div>
            &nbsp;{part2[0]}<span className="do-h2">{part2.slice(1)}</span>
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
            {skills.map(({ key, title, description, details, tools, topBorder }) => (
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
                    <Heading as="h3">{title}</Heading>
                    <Heading as="h4">{description}</Heading>
                  </AccordionTrigger>
                  <AccordionContent className="what-accordion-content">
                    <Text as="p">{details}</Text>
                    <Heading as="h5">{t('whatido.toolsLabel')}</Heading>
                    <Flex className="what-content-flex" gap="1" wrap="wrap">
                      {tools.map((tool, index) => (
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
