import React, { Component } from "react";

const BoardCell = ({displayInfo}) => {
  const {char, player} = displayInfo;
  if (!player) return char;
  else return null;
};
 
export default BoardCell;