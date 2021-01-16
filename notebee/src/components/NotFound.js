import { Typography } from "@material-ui/core";
export default function NotFound() {
  return (
    <div>
      <Typography variant="h3" align="center">
        Error 404 :(
      </Typography>
      <Typography variant="h5" align="center">
        The page you're looking for was not found.
      </Typography>
    </div>
  );
}
