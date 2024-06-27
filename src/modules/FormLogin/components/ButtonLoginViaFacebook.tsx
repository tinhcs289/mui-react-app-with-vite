import ButtonPositive from "@/components/buttons/ButtonPositive";
import FacebookIcon from "@mui/icons-material/Facebook";
import type { MouseEventHandler } from "react";
import { useCallback } from "react";

export default function ButtonLoginViaFacebook() {
  const handleRequestLoginViaSSO1: MouseEventHandler<HTMLButtonElement> =
    useCallback((event) => {
      event?.stopPropagation?.();
      event?.preventDefault?.();
    }, []);

  // const handleRequestLoginViaSSO2: MouseEventHandler<HTMLButtonElement> =
  //   useCallback(
  //     (event) => {
  //       event?.stopPropagation?.();
  //       event?.preventDefault?.();
  //       setFocus("password");
  //     },
  //     [setFocus]
  //   );

  // const handleRequestLoginViaSSO3: MouseEventHandler<HTMLButtonElement> =
  //   useCallback(
  //     (event) => {
  //       event?.stopPropagation?.();
  //       event?.preventDefault?.();
  //       setFocus("rememberMe");
  //     },
  //     [setFocus]
  //   );

  return (
    <>
      <ButtonPositive
        noTextTransform
        startIcon={<FacebookIcon />}
        fullWidth
        onClick={handleRequestLoginViaSSO1}
      >
        Đăng nhập bằng Facebook
      </ButtonPositive>
      {/* <ButtonPositive
        noTextTransform
        startIcon={<FacebookIcon />}
        fullWidth
        onClick={handleRequestLoginViaSSO2}
      >
        Đăng nhập bằng Facebook
      </ButtonPositive>
      <ButtonPositive
        noTextTransform
        startIcon={<FacebookIcon />}
        fullWidth
        onClick={handleRequestLoginViaSSO3}
      >
        Đăng nhập bằng Facebook
      </ButtonPositive> */}
    </>
  );
}
