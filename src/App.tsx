import * as React from 'react'

import { ChakraProvider, Heading, Center, Input, Box, Button, Stack } from '@chakra-ui/react'
import Message from "./Message";

function App() {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Center>
        <Stack spacing='20px'>
          <Box>
            <Heading>Chatbot</Heading>
          </Box>
              <Box>
                <Message></Message>
                <Message></Message>
                <Message></Message>
              </Box>
              <Box>
                <Input placeholder='Enter Message'/>
              </Box>
              <Box>
                <Button onClick={() => console.log("Hello World")}>Send Message</Button>
              </Box>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}
export default App;