import { useRef, useState } from "react";

const useAccountModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(isModalOpen);

  const toggleAccountModal = () => {
    setIsModalOpen(!isModalOpen);
    modalRef.current = !isModalOpen;
  };

  return {
    isModalOpen,
    toggleAccountModal,
    modalRef,
  };
};

export default useAccountModal;
