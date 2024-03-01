import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Button, Text, VStack, Divider, Spacer, IconButton } from '@chakra-ui/react';
import axios from 'axios';
import { DeleteIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const [players, setPlayers] = useState([]);
  const [playerData, setPlayerData] = useState({
    name: '',
    roll: '',
  });

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  const handleCreatePlayer = async () => {
    try {
      await axios.post('http://localhost:5000/api/players', playerData);
      fetchPlayers();
      setPlayerData({ name: '', roll: '' });
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/players/${id}`);
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.100">
      <Box width="80%" bg="white" p="4" borderRadius="md" boxShadow="md">
        <Flex>
          <Box flex="1" pr="4">
            <VStack spacing="4">
              <Text fontSize="xl" fontWeight="bold" color="green.500">Create a Player</Text>
              <Input
                type="text"
                name="name"
                placeholder="Player Name"
                value={playerData.name}
                onChange={handleChange}
                bg="gray.100"
                color="green.900"
                borderRadius="md"
                border="none"
                _focus={{ boxShadow: 'none' }}
              />
              <Flex>
                <Box ml='10px' mr='10px'>
                  <input
                    type="radio"
                    name="roll"
                    id="batsman"
                    value="batsman"
                    checked={playerData.roll === 'batsman'}
                    onChange={handleChange}
                  />
                  <Text htmlFor="batsman" color="green.700" fontSize="lg" fontWeight="bold">Batsman</Text>
                </Box>
                <Spacer />
                <Box ml='10px' mr='10px'>
                  <input
                    type="radio"
                    name="roll"
                    id="allrounder"
                    value="allrounder"
                    checked={playerData.roll === 'allrounder'}
                    onChange={handleChange}
                  />
                  <Text htmlFor="allrounder" color="green.700" fontSize="lg" fontWeight="bold">Allrounder</Text>
                </Box>
                <Spacer />
                <Box ml='10px' mr='10px'>
                  <input
                    type="radio"
                    name="roll"
                    id="bowler"
                    value="bowler"
                    checked={playerData.roll === 'bowler'}
                    onChange={handleChange}
                  />
                  <Text htmlFor="bowler" color="green.700" fontSize="lg" fontWeight="bold">Bowler</Text>
                </Box>
              </Flex>
              <Button onClick={handleCreatePlayer} colorScheme="green">Create</Button>
            </VStack>
          </Box>
          <Divider orientation="vertical" />
          <Box flex="1" pl="4">
            <VStack spacing="4">
              <Text fontSize="xl" fontWeight="bold" color="green.500">Players</Text>
              {players.map((player) => (
                <Flex key={player._id} align="center" bg="green.50" p="2" borderRadius="md">
                  <Text ml='20px'>{player.name} - {player.roll}</Text>
                  <Spacer />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDeletePlayer(player._id)}
                    colorScheme="red"
                    variant="outline"
                  />
                </Flex>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
