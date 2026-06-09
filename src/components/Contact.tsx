import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    contactTimeline.fromTo(
      ".contact-section h3",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    contactTimeline.fromTo(
      ".contact-box",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );

    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <Box className="contact-section section-container" id="contact">
      <Box className="contact-container">
        <Heading as="h3" weight="regular">{config.developer.fullName}</Heading>
        <Flex className="contact-flex" justify="between">
          <Box className="contact-box">
            <Heading as="h4" weight="medium">Email</Heading>
            <Text as="p">
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </Text>
            <Heading as="h4" weight="medium">Location</Heading>
            <Text as="p">
              <span>{config.social.location}</span>
            </Text>
          </Box>
          <Box className="contact-box">
            <Heading as="h4" weight="medium">Social</Heading>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={config.contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Twitter <MdArrowOutward />
            </a>
            <a
              href={config.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Facebook <MdArrowOutward />
            </a>
            <a
              href={config.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </Box>
          <Box className="contact-box">
            <Heading as="h2" weight="regular">
              Designed and Developed <br /> by <span>{config.developer.fullName}</span>
            </Heading>
            <Heading as="h5" weight="medium">
              <MdCopyright /> {new Date().getFullYear()}
            </Heading>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Contact;
