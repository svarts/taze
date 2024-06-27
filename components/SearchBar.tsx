import React from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

interface SearchBarProps {
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <HStack>
            <Input
                placeholder="Kripto para ara..."
                value={inputValue}
                onChange={handleInputChange}
            />
            <Button onClick={handleSearch} colorScheme="blue">
                Ara
            </Button>
        </HStack>
    );
};

export default SearchBar;