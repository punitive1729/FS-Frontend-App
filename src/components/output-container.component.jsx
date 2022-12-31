import { Fragment, useContext } from 'react';
import './output-container.styles.scss';
import { SuccessContext } from '../contexts/success.context';

const Output = ({ file }) => {
  const { setSuccessMessage, setSuccess } = useContext(SuccessContext);
  const copyLink = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(file);
    } else {
      document.execCommand('copy', true, file);
    }
    setSuccess('show-success');
    setSuccessMessage('Link Copied');
    setTimeout(() => {
      setSuccess('no-show');
    }, 1000);
  };
  return (
    <Fragment>
      <input type='text' className='output-text' value={file} />
      <button className='output-button' onClick={copyLink}>
        Copy
      </button>
    </Fragment>
  );
};

export default Output;
