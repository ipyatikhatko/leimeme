"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";

import { CreateMemeDto } from "@/app/types/meme";
import { client } from "@/lib/api";
import { useMemeValidation } from "@/hooks/useMemeValidation";

export default function AddModal({
  disclosure,
  onSuccess,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
  onSuccess: () => void;
}) {
  const { isOpen, onOpenChange, onClose } = disclosure;
  const [memeData, setMemeData] = useState<CreateMemeDto>({
    name: "",
    image: "",
  });
  const { validateMeme, validationResult } = useMemeValidation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedMemeData = { ...memeData, [name]: value };

    setMemeData(updatedMemeData);

    // Validate on each change to clear errors when fixed
    validateMeme(updatedMemeData.name, updatedMemeData.image);
  };

  const handleSave = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { isValid } = validateMeme(memeData.name, memeData.image);

    if (isValid) {
      const result = await client.createMeme(memeData);

      if ("error" in result) {
        // Handle error if needed
        //eslint-disable-next-line no-console
        console.error("Error creating meme:", result.error);
      } else {
        onSuccess();
        onClose();
        // Reset form
        setMemeData({ name: "", image: "" });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent as="form" onSubmit={handleSave}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Meme
            </ModalHeader>
            <ModalBody>
              <Input
                errorMessage={validationResult.errors.name}
                isInvalid={!!validationResult.errors.name}
                label="Name"
                name="name"
                placeholder="Meme name"
                type="text"
                value={memeData.name}
                variant="bordered"
                onChange={handleChange}
              />
              <Input
                errorMessage={validationResult.errors.image}
                isInvalid={!!validationResult.errors.image}
                label="Image URL"
                name="image"
                placeholder="Meme Image URL"
                type="text"
                value={memeData.image}
                variant="bordered"
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Create Meme
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
