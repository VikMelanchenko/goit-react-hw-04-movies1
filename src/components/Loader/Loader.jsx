import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Spinner() {
  return (
    <Loader
      className="spinner"
      type="ThreeDots"
      color="#8B0000"
      height={80}
      width={80}
    />
  );
}
