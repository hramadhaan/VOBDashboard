import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

const Menus = (props) => {
  const { id, anchorEl, setAnchorEl } = props;

  return (
    <Menu
      id={`simple-menu-${id}`}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={() => alert(`${id}`)}>Action</MenuItem>
      <MenuItem>Another action</MenuItem>
      <MenuItem>Something else here</MenuItem>
    </Menu>
  );
};

export default Menus;
