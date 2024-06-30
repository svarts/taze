import { Box, Image, Text, Heading, Stack, Link, Container } from '@chakra-ui/react';
import axios from 'axios';
import { NewsArticle, NewsPageProps } from '@/types';
import { logError } from '@/services/logger';

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/news');
    const newsArticles: NewsArticle[] = response.data.data;
    return { props: { newsArticles } };
  } catch (error) {
    logError (error as Error);
    return { props: { newsArticles: [] } };
  }
};

const NewsPage: React.FC<NewsPageProps> = ({ newsArticles }) => {
  return (
    <Container maxW="container.lg" p={4}>
      {newsArticles.map((article, index) => (
        <Link key={index} href={article.url} isExternal _hover={{ textDecoration: 'none' }}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} mb={4} bg="gray.50" transition="transform .5s ease-in-out" _hover={{ transform: 'scale(1.05)' }}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="center">
              <Image boxSize="150px" src={article.imageurl} alt={`News image for ${article.title}`} objectFit="cover" borderRadius="md" />
              <Box flex="1">
                <Heading size="md" mb={2}>{article.title}</Heading>
                <Text fontSize="sm">{article.body}</Text>
                <Text fontSize="xs" color="gray.500">Published by {article.source} on {article.published_on}</Text>
              </Box>
            </Stack>
          </Box>
        </Link>
      ))}
    </Container>
  );
};

export default NewsPage;
