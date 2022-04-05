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
import { useEffect, useState } from "react";
import axios from "axios";

interface MessageObject {
  contents: string;
  user: string;
  time: Date;
}

function App() {
  // 2. Use at the root of your app

  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<MessageObject[]>([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "/messages").then((res) => {
      console.log(res);
      setMessages(
        res.data.map((message: any) => {
          return {
            contents: message.contents,
            user: message.user,
            time: new Date(message.time),
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    const messagesRefreshInterval = setInterval(() => {
      axios.get(process.env.REACT_APP_SERVER_URL + "/messages").then((res) => {
        console.log(res);
        setMessages(
          res.data.map((message: any) => {
            return {
              contents: message.contents,
              user: message.user,
              time: new Date(message.time),
            };
          })
        );
      });
    }, 500);
    return () => {
      clearInterval(messagesRefreshInterval);
    };
  }, []);

  // Handle adding a new message and querying hugging face for NLP analysis
  const handleMessages = async () => {
    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/addMessages", {
      contents: msg,
      user: "me",
      time: new Date(),
    });
    setMessages(
      res.data.map((message: any) => {
        return {
          contents: message.contents,
          user: message.user,
          time: new Date(message.time),
        };
      })
    );
  };

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
              onClick={handleMessages}
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
