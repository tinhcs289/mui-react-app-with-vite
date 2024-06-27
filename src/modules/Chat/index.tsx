import BoxChat, { BoxChatMessage } from "@/components/box/BoxChat";
import type { BoxProps } from "@mui/material/Box";

const messages = [
  { from: "foo", content: "Hello there" },
  { from: "bar", content: "Hey how you doing?" },
  { from: "foo", content: "Good thanks, fancy meeting later?" },
  { from: "bar", content: "Sure thing" },
  {
    from: "bar",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export default function Chat(props: Partial<BoxProps>) {
  return (
    <BoxChat {...(props as any)}>
      {messages.map(({ from, content }, i) => (
        <BoxChatMessage
          key={i}
          transmission={from === "foo" ? "receiver" : "sender"}
        >
          {content}
        </BoxChatMessage>
      ))}
    </BoxChat>
  );
}
