import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
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

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
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
            My <span>Work</span>
          </Heading>
        </Box>
        <Box className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <Box className="work-box" key={project.id}>
              <Box className="work-info">
                <Flex className="work-title" justify="between">
                  <Heading as="h3">{String(index + 1).padStart(2, '0')}</Heading>
                  <Box style={{ textAlign: 'right' }}>
                    <Heading as="h4">{project.title}</Heading>
                    <Text as="p">{project.category}</Text>
                  </Box>
                </Flex>
                <Heading as="h4" weight="medium">Tools and features</Heading>
                <Text as="p">{project.technologies}</Text>
              </Box>
              <WorkImage image={project.image} alt={project.title} />
            </Box>
          ))}
          {/* See All Works Button */}
          <Box className="work-box work-box-cta">
            <Flex className="see-all-works" direction="column" align="center" justify="center" gap="3">
              <Heading as="h3">Want to see more?</Heading>
              <Text as="p">Explore all of my projects and creations</Text>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Work;
