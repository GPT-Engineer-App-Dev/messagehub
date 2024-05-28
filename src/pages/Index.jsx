import { Container, VStack, Box, Text, Input, Button, HStack, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Flex as="nav" bg="blue.500" color="white" p={4} mb={4} justifyContent="center">
        <Text fontSize="2xl">Public Post Board</Text>
      </Flex>
      <VStack spacing={4} align="stretch">
        <Box as="main" flex="1" p={4} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4} align="stretch">
            {posts.length === 0 ? (
              <Text>No posts yet. Be the first to post!</Text>
            ) : (
              posts.map((post, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
                  <Text>{post}</Text>
                </Box>
              ))
            )}
          </VStack>
        </Box>
        <Box as="form" p={4} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4}>
            <Input
              placeholder="Write your post here..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handlePostSubmit}>
              Submit Post
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;