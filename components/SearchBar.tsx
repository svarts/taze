import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';
import { SearchBarProps } from '@/types';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <InputGroup width="100%">
            <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
                placeholder="Search Cryptocurrencies"
                value={value}
                onChange={onChange}
                bg="#111827"
                borderColor="gray.700"
                textColor={value ? "white" : "gray.400"}
                borderRadius="lg"
                width={450}
            />
        </InputGroup>
    );
};