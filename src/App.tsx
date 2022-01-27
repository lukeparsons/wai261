import * as React from 'react'

import { ChakraProvider, Heading, Center, Input, Box, Button } from '@chakra-ui/react'
import Message from "./Message";

function App() {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Center>
        <Box>
          <Heading>ChakraUI Heading</Heading>
          <Message/>
          <Message/>
          <Input onChange={(e) => console.log(e.target.value)}/>
          <Button onClick={() => console.log("Hello World")}>Send Message</Button>
        </Box>
      </Center>
    </ChakraProvider>
  )
}
export default App;