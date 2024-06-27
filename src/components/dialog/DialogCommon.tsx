import createStatesContext from "@/helpers/react-context-helpers/createStatesContext";
import { AnyObject, CommonFormOnClose } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { styled, Theme, useMediaQuery } from "@mui/material";
import Backdrop, { BackdropProps } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog, {
  dialogClasses as classes,
  DialogProps,
} from "@mui/material/Dialog";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import Grid, { GridProps } from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography, { TypographyProps } from "@mui/material/Typography";
import type {
  ComponentType,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
} from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";

enum SlideTypeEnum {
  down = "down",
  up = "up",
  left = "left",
  right = "right",
}

export type SlideType = `${SlideTypeEnum}`;

const SlideComponent = Object.keys(SlideTypeEnum).reduce((dict, key) => {
  // @ts-ignore
  dict[key] = forwardRef(function Transition(props, ref) {
    return <Slide direction={key} ref={ref} {...(props as any)} />;
  });
  return dict;
}, {} as { [key in SlideTypeEnum]: typeof Slide });

const DialogStyled = {
  Root: styled(Dialog)<DialogProps>({
    [`&.${classes.root}`]: {
      [`& > .${classes.container}`]: {
        [`& > .${classes.paper}`]: {
          [`&:not(.${classes.paperFullScreen})`]: {
            borderRadius: 12,
          },
          minWidth: "680px",
          position: "relative",
          // backgroundImage: `url(${IMAGES.background.dialog})`,
          backgroundRepeat: "none",
          backgroundPosition: "center",
        },
      },
    },
  }),
  Title: styled(DialogTitle)<DialogTitleProps>({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px",
    paddingBottom: "16px",
  }),
  Content: styled(DialogContent)<DialogContentProps>({
    padding: "40px",
  }),
  Actions: styled(DialogActions)<DialogActionsProps>({
    padding: "40px",
    paddingTop: "16px",
  }),
  Loading: styled(Backdrop)<BackdropProps>(({ theme }) => ({
    zIndex: theme.zIndex.modal + 2,
    position: "absolute",
  })),
};

type DialogStates<CallbackDataOnClose extends AnyObject = AnyObject> = {
  loading?: boolean;
  onClose?: CommonFormOnClose<CallbackDataOnClose>;
};

const { StatesProvider, useGetState, useInitState, useSetState } =
  createStatesContext<DialogStates>();

export const useSetStateDialog = useSetState;
export const useInitStateDialog = useInitState;
export const useGetStateDialog = useGetState;

const LoadingInitializer = memo(function Initializer({
  loading,
}: {
  loading?: boolean;
}) {
  useInitState("loading", loading, {
    when: "whenever-value-changes",
  });
  return null;
});

const OnCloseInitializer = memo(function Initializer({
  onClose,
}: {
  onClose?: DialogStates["onClose"];
}) {
  const handleOnClose: Required<DialogStates>["onClose"] = useCallback(
    ({ reason, feedback }) => {
      onClose?.({ reason, feedback });
    },
    [onClose]
  );
  useInitState("onClose", handleOnClose, {
    when: "whenever-value-changes",
  });
  return null;
});

function ButtonClose() {
  const onClose = useGetState((s) => s?.onClose);
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      onClose?.({ reason: "force_close" });
    },
    [onClose]
  );
  return (
    <IconButton onClick={handleClick}>
      <CloseIcon color="primary" />
    </IconButton>
  );
}

const Loading = memo(function LoadingMemo() {
  const loading = useGetState((s) => !!s?.loading);
  const $Loading = useMemo(
    () =>
      loading ? (
        <DialogStyled.Loading open>
          <CircularProgress color="inherit" />
        </DialogStyled.Loading>
      ) : null,
    [loading]
  );
  return $Loading;
});

const DialogCommon = {
  Provider: function DialogStatesProvider<
    CallbackDataOnClose extends AnyObject = AnyObject
  >({
    loading,
    onClose,
    children,
  }: Pick<DialogStates<CallbackDataOnClose>, "loading" | "onClose"> & {
    children?: ReactNode;
  }) {
    return (
      <StatesProvider>
        <LoadingInitializer loading={loading} />
        <OnCloseInitializer onClose={onClose as any} />
        {children}
      </StatesProvider>
    );
  },
  Paper: function DialogCommonPaper({
    children,
    component,
    onSubmit,
    formRef,
    Component = DialogStyled.Root,
    slide = "down",
    ...props
  }: Omit<DialogProps, "onSubmit" | "onClose"> & {
    formRef?: Ref<unknown>;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    Component?: typeof DialogStyled.Root | ComponentType<any>;
    slide?: SlideType;
  }) {
    const formProps = useMemo(() => {
      if (component !== "form") return { component };
      return {
        component,
        ref: formRef,
        noValidate: true,
        autoComplete: "off",
        onSubmit,
      } as unknown as Partial<DialogProps>;
    }, [component, formRef, onSubmit]);

    const isSmallScreenOrSmaller = useMediaQuery((theme: Theme) =>
      theme?.breakpoints?.down?.("sm")
    );
    const fullScreen = useMemo(() => {
      if (!!props?.fullScreen) return true;
      if (isSmallScreenOrSmaller) return true;
      return false;
    }, [props?.fullScreen, isSmallScreenOrSmaller]);

    return (
      <Component
        keepMounted={false}
        scroll="paper"
        TransitionComponent={SlideComponent[slide]}
        {...props}
        {...formProps}
        fullScreen={fullScreen}
      >
        <Loading />
        {children}
      </Component>
    );
  },
  Title: function DialogCommonTitle({
    children,
    innerRef,
    Component = DialogStyled.Title,
    ...props
  }: DialogTitleProps<"div"> & {
    innerRef?: Ref<unknown>;
    Component?: typeof DialogStyled.Title | ComponentType<any>;
  }) {
    return (
      <Component {...props} ref={innerRef as any} component="div">
        {children}
        <ButtonClose />
      </Component>
    );
  },
  TitleText: styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "32px",
    color: theme.palette.primary.main,
  })) as ComponentType<TypographyProps>,
  Content: function DialogCommonContent({
    children,
    contentProps,
    innerRef,
    Component = DialogStyled.Content,
    ...props
  }: DialogContentProps & {
    innerRef?: Ref<unknown>;
    contentProps?: Partial<GridProps>;
    Component?: typeof DialogStyled.Content | ComponentType<any>;
  }) {
    return (
      <Component {...props} ref={innerRef as any}>
        <Grid container width="100%" {...contentProps}>
          {children}
        </Grid>
      </Component>
    );
  },
  Actions: function DialogCommonActions({
    children,
    innerRef,
    contentProps,
    Component = DialogStyled.Actions,
    ...props
  }: DialogActionsProps & {
    innerRef?: Ref<unknown>;
    contentProps?: Partial<GridProps>;
    Component?: typeof DialogStyled.Actions | ComponentType<any>;
  }) {
    return (
      <Component {...props} ref={innerRef as any}>
        <Grid container width="100%" {...contentProps}>
          {children}
        </Grid>
      </Component>
    );
  },
};
export default DialogCommon;

export type DialogCommonProviderProps = Parameters<
  typeof DialogCommon.Provider
>[0];

export type DialogCommonProps = Parameters<typeof DialogCommon.Paper>[0];

export type DialogCommonTitleProps = Parameters<typeof DialogCommon.Title>[0];

export type DialogCommonContentProps = Parameters<
  typeof DialogCommon.Content
>[0];

export type DialogCommonActionsProps = Parameters<
  typeof DialogCommon.Actions
>[0];
