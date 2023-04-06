/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useState } from "react";

import useTheme from "@material-ui/core/styles/useTheme";
import Paper from "@material-ui/core/Paper";
import { compose } from "redux";
import Add from "@material-ui/icons/Add";
import AddNewCRMLabelModal from "../containers/modals/AddNewCRMLabel";


const box = `/images/box.png`;

function NoCRMLabel() {
  const [isModalOpen, toggleModal] = useState(false);
  const theme = useTheme();
  return (
    <div>
      <AddNewCRMLabelModal
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
      />
      <div className="p-3  mt-1" style={{ minHeight: "100vh" }}>
        <div className="my-5 text-center">
          <img src={box} alt="box" style={{ width: 86, height: 86 }} />
        </div>
        <div className="my-5">
          To activate marketing automation it is necessary for your customers first
          Create a category.
        </div>
        <Paper
          onClick={() => toggleModal(true)}
          className="d-flex justify-content-center sticky-bottom p-3"
        >
          <div>
            <Add
              fontSize="small"
              color="primary"
              className="d-flex flex-1 justify-content-center u-cursor-pointer"
            />
          </div>
          <div
            style={{ color: theme.palette.primary.main }}
            className="u-cursor-pointer"
          >
            Add new category
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default compose(memo)(NoCRMLabel);
