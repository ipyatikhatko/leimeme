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
import { useState, useEffect } from "react";

import { LockIcon } from "./icons/Lock";

import { Meme } from "@/app/types/meme";
import { client } from "@/lib/api";
import { useMemeValidation } from "@/hooks/useMemeValidation";

export default function EditModal({
  meme,
  disclosure,
  onUpdate,
}: {
  meme: Meme | null;
  disclosure: ReturnType<typeof useDisclosure>;
  onUpdate: () => void;
}) {
  const { isOpen, onOpenChange, onClose } = disclosure;
  const [memeData, setMemeData] = useState<Meme | null>(meme);
  const { validateMeme, validationResult } = useMemeValidation();

  useEffect(() => {
    setMemeData(meme);
  }, [meme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (memeData) {
      const updatedMemeData = { ...memeData, [name]: value } as Meme;

      setMemeData(updatedMemeData);

      // Validate on each change to clear errors when fixed
      validateMeme(updatedMemeData.name, updatedMemeData.image);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (memeData) {
      const { isValid } = validateMeme(memeData.name, memeData.image);

      if (isValid) {
        await client.updateMeme(memeData.id, memeData);
        onUpdate();
        onClose();
      }
    }
  };

  return (
    <>
      {meme && (
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent as="form" onSubmit={handleSave}>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Meme
                </ModalHeader>
                <ModalBody>
                  <Input
                    readOnly
                    defaultValue={meme.id.toString()}
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="ID"
                    placeholder="Meme ID"
                    variant="flat"
                  />
                  <Input
                    errorMessage={validationResult.errors.name}
                    isInvalid={!!validationResult.errors.name}
                    label="Name"
                    name="name"
                    placeholder="Meme name"
                    type="text"
                    value={memeData?.name || ""}
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
                    value={memeData?.image || ""}
                    variant="bordered"
                    onChange={handleChange}
                  />
                  <Input
                    readOnly
                    defaultValue={memeData?.likes.toString() || ""}
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Likes"
                    placeholder="Meme likes"
                    type="number"
                    variant="flat"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
