import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flex, Box, Input, Button, Text, Heading } from '@chakra-ui/react';
import axios from 'axios';

const Signup = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert('User created successfully');
      history('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.100">
      <Box p="8" borderWidth="1px" borderRadius="md" bg="white" boxShadow="lg" width="300px" height="400px">
        <Heading mb="6" textAlign="center" color="green.500">Signup</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            mb="3"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            bg="gray.200"
            borderRadius="md"
          />
          <Input
            mb="3"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            bg="gray.200"
            borderRadius="md"
          />
          <Input
            mb="3"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            bg="gray.200"
            borderRadius="md"
          />
          <Button type="submit" colorScheme="green">Signup</Button>
        </form>
        <Text mt="3" textAlign="center">
          Already registered? <Link to="/login" color="green.500">Login</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
