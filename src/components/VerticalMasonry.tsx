import { Box } from "@mantine/core";
import classes from "./VerticalMasonry.module.css";

export interface VerticalMasonryProps {
  children?: React.ReactNode;
}

export function VerticalMasonry({ children }: VerticalMasonryProps) {
  return <Box className={classes.root}>{children}</Box>;
}
