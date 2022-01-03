import { useState } from "react";

export const useModalClose = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (entity, setEntity) => {
    setEntity(entity);
    setIsOpen(true);
  };

  const onClose = (setEntity) => {
    setEntity(null);
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose };
};
