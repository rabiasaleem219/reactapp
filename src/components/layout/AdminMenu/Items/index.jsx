import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const Items = ({ text, open, icon }) => {
  return (
    <ListItemButton
      key={text}
      sx={{
        minHeight: 48,
        justifyContent: open ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  );
};

export default Items;
