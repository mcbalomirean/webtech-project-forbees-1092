import { Typography } from "@material-ui/core";
// 404 Error Page, displays an error message
export default function NotFound() {
  return (
    <div>
      <Typography variant="h3" align="center">
        Error 404 :(
      </Typography>
      <Typography variant="h5" align="center">
        The page you're looking for was not found.
      </Typography>
      <img
        src={process.env.PUBLIC_URL + "/logo192.png"}
        alt="NoteBee Logo"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      ></img>
    </div>
  );
}
