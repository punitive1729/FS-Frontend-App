import './container.styles.scss';
import UploadLogo from './../upload.svg';
import axios from 'axios';
import { useRef, useState, useContext } from 'react';
import { SuccessContext } from '../contexts/success.context';
import Output from './output-container.component';
const backendUrl = 'https://fs-app-pko.onrender.com/api/v1/files';

const Container = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { setSuccessMessage, setSuccess } = useContext(SuccessContext);
  const [downloadLink, setDownloadLink] = useState(null);
  const inputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    console.log('Uploading..', file);
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file, file.name);
    try {
      const response = await axios.post(backendUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { downloadUrl } = response.data;
      console.log('File Sent...', downloadUrl);
      setSuccess('show-success');
      setSuccessMessage('File Sent');
      setFile(null);
      setDownloadLink(downloadUrl);
      setTimeout(() => {
        setSuccess('no-show');
      }, 2000);
    } catch (err) {
      console.log('Error', err);
      setSuccess('show-fail');
      setFile(null);
      setSuccessMessage(err.message);
      setDownloadLink(null);
      setTimeout(() => {
        setSuccess('no-show');
      }, 2000);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    try {
      const file = event.dataTransfer.files[0];
      setFile(file);
      handleFileUpload(file);
    } catch (error) {
      setFile(null);
    }
    setFile(null);
  };

  const fileUpload = (event) => {
    console.log('FileUpload..', file);
    try {
      const file = event.target.files[0];
      setFile(file);
      handleFileUpload(file);
    } catch (error) {
      setFile(null);
    }
    setFile(null);
    event.target.value = null;
  };

  const onBrowseClick = () => {
    inputRef.current.click();
  };

  return (
    <div className='home'>
      <div className='container'>
        <div
          className={`drop-container ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {!downloadLink ? (
            <div>
              <input
                type='file'
                multiple={true}
                onChange={fileUpload}
                ref={inputRef}
                className='file-upload'
              />
              <div className='image-container'>
                <img
                  draggable={false}
                  src={UploadLogo}
                  alt='upload-file-icon'
                  className='upload-image'
                />
                <div className='upload-text'>
                  Drag n drop or{' '}
                  <span className='browse-button' onClick={onBrowseClick}>
                    Browse
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <Output file={downloadLink} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
