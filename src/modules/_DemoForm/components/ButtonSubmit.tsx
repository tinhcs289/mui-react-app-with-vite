import ButtonSubmit from "@/components/buttons/ButtonSubmit";
import CheckIcon from "@mui/icons-material/Check";

export default function ButtonLogin() {
  return (
    <ButtonSubmit
      id="form:demo:btn-submit"
      startIcon={<CheckIcon />}
      title="Lưu"
      aria-label="Lưu"
    >
      Lưu
    </ButtonSubmit>
  );
}
