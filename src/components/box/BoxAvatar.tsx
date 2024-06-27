import Avatar from "@mui/material/Avatar";
import type { MuiIcon, MuiIconProps } from "@/types";
import type { AvatarProps } from "@mui/material/Avatar";

export type BoxAvatarProps = AvatarProps & {
  Icon?: MuiIcon;
  iconProps?: MuiIconProps;
};

export default function BoxAvatar({
  children,
  Icon,
  iconProps,
  ...otherProps
}: BoxAvatarProps) {
  if (!!Icon)
    return (
      <Avatar {...otherProps}>
        <Icon {...iconProps} />
      </Avatar>
    );

  return <Avatar {...otherProps}>{children}</Avatar>;
}
