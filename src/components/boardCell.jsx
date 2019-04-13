import React, { Component } from "react";

const BoardCell = ({ displayInfo }) => {
  const { char, player } = displayInfo;
  const charToDisplay = !player ? char : null;
  return charToDisplay;
};

export default BoardCell;
