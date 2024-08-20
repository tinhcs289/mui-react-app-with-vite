import Grid from "@mui/material/Grid";
import TextBox from "./TextBox";

export default function DemoDataEntries() {
  return (
    <Grid container width="100%" height="100%">
      <Grid xs={12}>
        <TextBox />
      </Grid>
    </Grid>
  );
}
