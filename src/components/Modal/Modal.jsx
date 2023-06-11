import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ largeImageURL, tags, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  document.addEventListener('DOMContentLoaded', () => {
    return createPortal(
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>
          <img src={largeImageURL} alt={tags} />
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  });
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

