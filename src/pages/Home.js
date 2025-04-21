import React from "react";
import { Link } from "react-router-dom";
import { 
  Container, 
  Title, 
  Text, 
  SimpleGrid, 
  Card, 
  Group, 
  Badge,
  Box,
  ThemeIcon,
  Overlay,
  Button
} from "@mantine/core";
import { IconFileText, IconRobot, IconArrowRight } from "@tabler/icons-react";
import "./Home.css";

const Home = () => {
  return (
    <Container size="lg" className="home-container">
      <Box className="hero-section" mb={50}>
        <Title className="home-title" ta="center">
          Welcome to Letter Likho
        </Title>
        <Text size="xl" className="home-subtitle" ta="center" c="dimmed">
          Create professional letters in minutes with our easy-to-use templates
        </Text>
      </Box>
      
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <Card
          component={Link}
          to="/letter-generator"
          className="feature-card"
          padding="xl"
          radius="md"
          withBorder
        >
          <Card.Section className="card-hover">
            <Group justify="center" py="xl">
              <ThemeIcon size={80} radius="md" variant="light" color="indigo">
                <IconFileText size={40} stroke={1.5} />
              </ThemeIcon>
            </Group>
          </Card.Section>

          <Title order={3} ta="center" mt="md">
            Letter Generator
          </Title>
          <Text size="sm" c="dimmed" ta="center" mt="sm">
            Generate professional letters using our pre-built templates
          </Text>
          <Button
            variant="light"
            color="indigo"
            fullWidth
            mt="md"
            radius="md"
            rightSection={<IconArrowRight size={16} />}
          >
            Create Letter
          </Button>
        </Card>
        
        <Card
          className="feature-card"
          padding="xl"
          radius="md"
          withBorder
        >
          <Card.Section className="card-hover">
            <Group justify="center" py="xl">
              <ThemeIcon size={80} radius="md" variant="light" color="cyan">
                <IconRobot size={40} stroke={1.5} />
              </ThemeIcon>
            </Group>
          </Card.Section>

          <Title order={3} ta="center" mt="md">
            AI Generator
          </Title>
          <Text size="sm" c="dimmed" ta="center" mt="sm">
            Generate custom letters using AI - Coming Soon
          </Text>
          <Button
            variant="light"
            color="cyan"
            fullWidth
            mt="md"
            radius="md"
            disabled
            rightSection={<IconArrowRight size={16} />}
          >
            Coming Soon
          </Button>
          <Badge
            className="coming-soon-badge"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            size="lg"
            radius="xl"
            pos="absolute"
            top={16}
            right={16}
          >
            Soon
          </Badge>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
