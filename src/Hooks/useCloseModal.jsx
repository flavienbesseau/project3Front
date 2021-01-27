import { useRef, useEffect } from 'react';

const useCloseModal = (handler) => {
  let refModal = useRef();

  useEffect(() => {
    const outsideModalHandler = (event) => {
      if (!refModal.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", outsideModalHandler);

    return () => document.removeEventListener("mousedown", outsideModalHandler);
  });

  return refModal;
};

export default useCloseModal;