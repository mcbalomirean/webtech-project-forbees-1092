import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
  Link,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Typography,
} from "@material-ui/core";

function MarkdownParagraph(props) {
  return <Typography variant="body1">{props.children}</Typography>;
}

function MarkdownHeading(props) {
  return <Typography variant={`h${props.level}`}>{props.children}</Typography>;
}

function MarkdownListItem(props) {
  return (
    <li>
      <Typography variant="body1">{props.children}</Typography>
    </li>
  );
}

function MarkdownTable(props) {
  return (
    <TableContainer>
      <Table size="small">{props.children}</Table>
    </TableContainer>
  );
}

function MarkdownTableCell(props) {
  return (
    <TableCell>
      <Typography variant="body1">{props.children}</Typography>
    </TableCell>
  );
}

function MarkdownTableRow(props) {
  return <TableRow>{props.children}</TableRow>;
}

function MarkdownTableBody(props) {
  return <TableBody>{props.children}</TableBody>;
}

function MarkdownTableHead(props) {
  return <TableHead>{props.children}</TableHead>;
}

const renderers = {
  heading: MarkdownHeading,
  paragraph: MarkdownParagraph,
  link: Link,
  listItem: MarkdownListItem,
  table: MarkdownTable,
  tableHead: MarkdownTableHead,
  tableBody: MarkdownTableBody,
  tableRow: MarkdownTableRow,
  tableCell: MarkdownTableCell,
};

export default function NoteViewer(props) {
  return <ReactMarkdown plugins={[gfm]} renderers={renderers} {...props} />;
}
