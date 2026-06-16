import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

type TranslatedProject = { category: string; description: string };

const Work = () => {
  const { t } = useTranslation();

  const translatedProjects = t('projects', { returnObjects: true }) as TranslatedProject[];
  const projects = config.projects.slice(0, 5).map((p, i) => ({ ...p, ...translatedProjects[i] }));

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <Box className="work-section" id="work">
      <Box className="work-container section-container">
        <Box className="work-title-wrap">
          <Heading as="h2" weight="medium">
            {t('work.titlePrefix')}<span>{t('work.titleHighlight')}</span>
          </Heading>
        </Box>
        <Box className="work-flex">
          {projects.map((project, index) => (
            <Box className="work-box" key={project.id}>
              <Box className="work-info">
                <Flex className="work-title" justify="between">
                  <Heading as="h3">{String(index + 1).padStart(2, '0')}</Heading>
                  <Box style={{ textAlign: 'right' }}>
                    <Heading as="h4">{project.title}</Heading>
                    <Text as="p">{project.category}</Text>
                  </Box>
                </Flex>
                <Heading as="h4" weight="medium">{t('work.toolsLabel')}</Heading>
                <Text as="p">{project.technologies}</Text>
              </Box>
              <WorkImage image={project.image} alt={project.title} />
            </Box>
          ))}
          <Box className="work-box work-box-cta">
            <Flex className="see-all-works" direction="column" align="center" justify="center" gap="3">
              <Heading as="h3">{t('work.ctaHeading')}</Heading>
              <Text as="p">{t('work.ctaSubheading')}</Text>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                {t('work.ctaButton')}
              </Link>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Work;
