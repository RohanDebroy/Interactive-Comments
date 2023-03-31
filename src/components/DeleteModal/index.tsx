import React, { FC, useEffect, useState } from "react";
import "./deleteModal.css";

type DeleteModalProps = {
  show: boolean;
  setModal: (value: boolean) => void;
  onDelete: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ show, setModal, onDelete }) => {
  return show ? (
    <div id="model">
      <div className="content">
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex">
          <button
            className="no-delete"
            onClick={() => {
              setModal(false);
            }}
          >
            No, cancel
          </button>
          <button
            className="yes-delete"
            onClick={() => {
              onDelete();
              setModal(false);
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DeleteModal;
