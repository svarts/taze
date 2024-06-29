import React from 'react';
import { Box, Text, Link, VStack, Flex } from '@chakra-ui/react';
import { NewsListProps } from '@/types';

export const NewsList: React.FC<NewsListProps> = ({ news }) => {
    return (
        <Box mt={10}>
            <VStack spacing={5}>
                {news.map((article, index) => (
                    <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.800" color="white" width="100%">
                        <Flex direction="column">
                            <Text fontSize="xl" fontWeight="bold">
                                <Link href={article.url} isExternal>
                                    {article.title}
                                </Link>
                            </Text>
                            <Text mt={2} fontSize="sm" color="gray.400">
                                {article.source}
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};