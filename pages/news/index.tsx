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
    logError(error as Error);
    return { props: { newsArticles: [] } };
  }
};

const NewsPage: React.FC<NewsPageProps> = ({ newsArticles }) => {
  return (
    <Container maxW="container.lg" p={8}>
      <Heading as="h6" size="xl" mb={6} textAlign="center" color="gray.300" fontWeight="medium">Latest Crypto News</Heading>
      {newsArticles.map((article, index) => (
        <Link key={index} href={article.url} isExternal _hover={{ textDecoration: 'none' }}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} mb={4} bg="gray.100" shadow="md" transition="transform .3s ease-in-out" _hover={{ transform: 'scale(1.03)', shadow: 'lg' }}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="center">
              <Image
                boxSize={{ base: '100%', md: '150px' }}
                src={article.thumb_2x || '/default-image.jpeg'}
                alt={`News image for ${article.title}`}
                objectFit="cover"
                borderRadius="md"
              />
              <Box flex="1" padding="4">
                <Heading size="lg" mb={2}>{article.title}</Heading>
                <Text fontSize="md" mb={4} noOfLines={[4, 3, 2]}>{article.description}</Text>
                <Text fontSize="xs" color="gray.600">Published by {article.news_site} on {new Date(article.updated_at * 1000).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}</Text>
              </Box>
            </Stack>
          </Box>
        </Link>
      ))}
    </Container>
  );
};

export default NewsPage;