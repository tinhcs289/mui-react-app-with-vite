import { styled } from "@mui/material";
import type { GridProps } from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import type { ComponentType } from "react";

type Transmission = "sender" | "receiver";

const GridMessage = styled(Grid, {
  shouldForwardProp: (p) => p !== "transmission",
})<GridProps & { transmission: Transmission }>(({ transmission }) => ({
  flexDirection: transmission === "receiver" ? "row" : "row-reverse",
}));

type MessageContentComponent = ComponentType<
  GridProps & { transmission: Transmission }
>;

const GridMessageContent = styled(Grid, {
  shouldForwardProp: (p) => p !== "transmission",
})<GridProps & { transmission: Transmission }>(({ theme, transmission }) => ({
  boxSizing: "border-box",
  background:
    transmission === "receiver"
      ? theme.palette.primary.main
      : theme.palette.error.main,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(4),
  boxShadow: theme.shadows[5],
  color: theme.palette.common.white,
  marginBottom: theme.spacing(2),
}));

type BoxChatMessageProps = GridProps & {
  transmission: Transmission;
  ContentComponent?: MessageContentComponent | typeof GridMessageContent;
};

function BoxChatMessage({
  transmission,
  children,
  ContentComponent = GridMessageContent,
  ...otherProps
}: BoxChatMessageProps) {
  return (
    <GridMessage
      transmission={transmission}
      container
      item
      xs={12}
      {...otherProps}
    >
      <Grid item xs={2} />
      <ContentComponent item xs={10} container transmission={transmission}>
        {children}
      </ContentComponent>
    </GridMessage>
  );
}

const GridRoot = styled(Grid)<GridProps>({
  overflowY: "auto",
  width: "100%",
  height: "100%",
});

export type BoxChatProps = GridProps;

function BoxChat({ children, ...otherProps }: BoxChatProps) {
  return (
    <GridRoot container {...otherProps}>
      {children}
    </GridRoot>
  );
}

export default BoxChat;
export { BoxChatMessage };
export type { BoxChatMessageProps, MessageContentComponent, Transmission };
