import {
  ChakraProvider,
  Heading,
  Center,
  Input,
  Box,
  Button,
  Stack,
} from "@chakra-ui/react";
import Message from "./Message";
import { useState } from "react";


const API_URL = "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment";
var HEADERS = new Headers();
HEADERS.append("Authorization", "Bearer <HIDE API>");

interface MessageObject {
  contents: string;
  user: string;
  time: Date;
}

function App() {
  // 2. Use at the root of your app

  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<MessageObject[]>([]);

  return (
    <ChakraProvider>
      <Center>
        <Stack spacing="20px">
          <Box>
            <Heading>Chatbot</Heading>
          </Box>
          <Box>
            {messages.map((message, index) => (
              <Message
                key={index}
                contents={message.contents}
                user={message.user}
                time={message.time}
              />
            ))}
          </Box>
          <Box>
            <Input
              placeholder="Enter Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              backgroundColor="lightblue"
              ml={2}
              onClick={async () => {
                let newMessage: MessageObject = {
                  contents: msg,
                  user: "me",
                  time: new Date(),
                };

                const  requestInit : RequestInit = {
                  method: "POST",
                  headers: HEADERS,
                  body: JSON.stringify({inputs: msg}),
                };
                const response = await fetch(API_URL, requestInit);
                const json = await response.json();
                console.log(json);

                const sortedRatings = json[0].sort(
                  (val1: any, val2: any) => val2.score - val1.score
                );

                var reviewStr;

                if(sortedRatings[0].score < 0.3) {
                    reviewStr = "I'm not sure how many stars to give to this review - is it a proper review?";
                } else if(sortedRatings[0].score > 0.3 && sortedRatings[0] < 0.6) {
                    reviewStr = "I think this review is equivalent to " + sortedRatings[0].label + " out of 5, but I'm not too confident";
                } else {
                  reviewStr = "I think this review is equivalent to " + sortedRatings[0].label + " out of 5";
                }

                const aiMessage: MessageObject = {
                  contents: reviewStr,
                  user: "AI",
                  time: new Date(),
                };
                setMessages([...messages, newMessage, aiMessage]);
              }}
            >
              Send Message
            </Button>
          </Box>
        </Stack>
      </Center>
    </ChakraProvider>
  );
}
export default App;
