import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import S from './Loader.module.css';

const loader = () => {
  return (
    <Loader
      className={S.Loader}
      type="ThreeDots"
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
};

export default loader;
