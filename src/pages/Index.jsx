import { Container, VStack, Box, Text, Input, Button, HStack, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts, useAddPost } from "../api/supabase";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost });
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
            {isLoading ? (
              <Text>Loading posts...</Text>
            ) : isError ? (
              <Text>Error loading posts.</Text>
            ) : posts.length === 0 ? (
              <Text>No posts yet. Be the first to post!</Text>
            ) : (
              posts.map((post) => (
                <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg">
                  <Text>{post.title}</Text>
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
            <Button colorScheme="blue" onClick={handlePostSubmit} isLoading={addPostMutation.isLoading}>
              Submit Post
            </Button>
            {addPostMutation.isError && <Text>Error submitting post.</Text>}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;