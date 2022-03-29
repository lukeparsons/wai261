import { Box, Text } from "@chakra-ui/react";

interface MessageProps {
  contents: string;
  user: string;
  time: Date;
}

const Message: React.FC<MessageProps> = (props) => {
  return (
    <Box
      alignSelf={props.user === "Me" ? "end" : "start"}
      backgroundColor={props.user === "Me" ? "lightblue" : "lightgreen"}
      fontWeight={600}
    >
      <Text color="black">{props.contents}</Text>
      <Text color="black" size="sm" fontWeight="200">
        {props.user}
      </Text>
      <Text color="black" size="sm" fontWeight="200">
        {props.time.toDateString()} {props.time.toLocaleTimeString()}
      </Text>
    </Box>
  );
};

export default Message;
