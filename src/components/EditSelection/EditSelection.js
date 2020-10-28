import React, { Fragment, useState } from "react";
import config from '../../config';
import "./EditSelection.css";

const { API_ENDPOINT } = config;

const EditSelection = (props) => {
  const { user_id } = props.user;
  const [previewSource, setPreviewSource] = useState("");
  // eslint-disable-next-line
  const [fileInputState, setFileInputState] = useState("");
  const [err, setErr] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = e => {
    setShow(true);
  };

  const onClose = e => {
    setShow(false);
  };

  const updateDescription = async e => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const body = { previewSource, user_id };
      // eslint-disable-next-line
      const response = await fetch(
        `${API_ENDPOINT}users/${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      window.location.reload()
    } catch (err) {
      setErr(err)
      console.error(err.message);
    }
  };

  if (!show) {
    return (
      <button
      className="dash-btn"
      id="centered-toggle-button"
      onClick={e => {
          showModal(e);
        }}
      >
      {" "}
      Update Photo <i className="fas fa-user"></i>{" "}
      </button>
    )
  }

  if (isLoading) {
    return (
      <div className="loading-msg">
        <i className="fas fa-paw pink loading-icon"></i>
        <p>Updating Photo ...</p>
        <i className="fas fa-paw pink loading-icon"></i>
     </div>
    )
  }

  return (
    <Fragment>
      <div className="modal" id="modal-img">
        <i id="modal-close" class="fas fa-window-close pink" onClick={onClose}></i>
        <div class="modal-content">
            <div class="modal-body">
             <div className='input-field'>
                {previewSource && (
                  <img 
                    id="edit-img"
                    className="profile-preview"
                    src={previewSource} 
                    alt="chosen" 
                  />
                )}
                {!previewSource && (
                  <i className="fas fa-user-circle"></i>
                )}
                <input type="file"
                  value={fileInputState} 
                  onChange={handleFileInputChange} 
                  name="image" 
                  id="file" 
                  className="inputfile" 
                />
                <label htmlFor="file" id="img-upload">Upload Photo <i class="fas fa-caret-right"></i></label>
                <div className="err-msg">{err}</div>
                <button id="img-submit" className="dash-btn mb-25" onClick={e => updateDescription(e)}>Submit <i class="fas fa-caret-right"></i></button>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default EditSelection;