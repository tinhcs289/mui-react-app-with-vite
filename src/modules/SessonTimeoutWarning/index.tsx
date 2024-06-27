import ButtonPositive from "@/components/buttons/ButtonPositive";
import DialogCommon from "@/components/dialog/DialogCommon";
import TypographyCommon from "@/components/typo/TypographyCommon";
import PATHS from "@/constants/paths";
import toEncodedUri from "@/helpers/string-helpers/toEncodedUri";
import { useReturnUriWhenUnAuthenticate } from "@/hooks/common-hooks/useReturnUri";
import { isSessionTimeoutSelector } from "@/redux/session";
import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

export default function SessonTimeoutWarning() {
  const { buildReturnHash } = useReturnUriWhenUnAuthenticate();

  const shouldShowWarning = useSelector(isSessionTimeoutSelector);
  const open = useMemo(() => !!shouldShowWarning, [shouldShowWarning]);

  const redirectToLogin = useCallback(() => {
    const uriHashed = buildReturnHash();
    const loginUrl = toEncodedUri(PATHS.login, uriHashed);
    window.location.replace(loginUrl);
  }, [buildReturnHash]);

  return (
    <DialogCommon.Provider onClose={redirectToLogin}>
      <DialogCommon.Paper open={open}>
        <DialogCommon.Title>
          <DialogCommon.TitleText>
            Phiên làm việc đã hết hạn
          </DialogCommon.TitleText>
        </DialogCommon.Title>
        <DialogCommon.Content>
          <TypographyCommon>
            Dữ liệu của bạn sẽ bị mất. Vui lòng đăng nhập lại để tiếp tục làm
            việc
          </TypographyCommon>
        </DialogCommon.Content>
        <DialogCommon.Actions>
          <ButtonPositive onClick={redirectToLogin}>
            Đi tới Đăng nhập
          </ButtonPositive>
        </DialogCommon.Actions>
      </DialogCommon.Paper>
    </DialogCommon.Provider>
  );
}
