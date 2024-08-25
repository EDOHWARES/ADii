import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <button 
          onClick={onClose} 
          className="text-black float-right font-bold text-xl">
          &times;
        </button>
        <div className="mt-4 text-red-500">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.string,
};

export default Modal;
