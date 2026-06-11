import { Link } from "react-router-dom";
import { config } from "../config";
import { Box, Heading, Text } from "@radix-ui/themes";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <Box className="myworks-page">
      <Box className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <Heading as="h1">
          All <span>Works</span>
        </Heading>
        <Text as="p">A collection of all my projects and creations</Text>
      </Box>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <Box className="myworks-card" key={project.id} data-cursor="disable">
            <Box className="myworks-card-number">0{index + 1}</Box>
            <Box className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </Box>
            <Box className="myworks-card-info">
              <Heading as="h3">{project.title}</Heading>
              <Text as="p" className="myworks-card-category">{project.category}</Text>
              <Text as="p" className="myworks-card-description">{project.description}</Text>
              <Text as="p" className="myworks-card-tech">{project.technologies}</Text>
            </Box>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default MyWorks;
