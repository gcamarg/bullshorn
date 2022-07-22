import React from "react";
import "./ListItem.css";
function ListItem(props) {
  return (
    <div className="listItem">
      <a className="listItem__text">{props.itemName}</a>
    </div>
  );
}

export default ListItem;
