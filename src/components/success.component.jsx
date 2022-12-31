import { useContext } from 'react';
import { SuccessContext } from '../contexts/success.context';
import './success.styles.scss';

const Success = () => {
  const { success, successMessage } = useContext(SuccessContext);
  return <div className={`${success}`}>{successMessage}</div>;
};

export default Success;
