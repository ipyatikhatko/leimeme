"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useDisclosure } from "@heroui/modal";

import EditModal from "./edit-modal";
import AddModal from "./add-modal";

import { client } from "@/lib/api";
import { Meme } from "@/app/types/meme";

export const columns: { name: string; uid: keyof Meme | "actions" }[] = [
  { name: "ID", uid: "id" },
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "LIKES", uid: "likes" },
  { name: "ACTIONS", uid: "actions" },
];

interface MemeTableProps {
  initialMemes: Meme[];
}

export default function MemeTable({ initialMemes }: MemeTableProps) {
  const [memes, setMemes] = useState<Meme[]>(initialMemes);
  const editDisclosure = useDisclosure();
  const addDisclosure = useDisclosure();
  const [memeToEdit, setMemeToEdit] = useState<Meme | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch memes when the component mounts or when refreshTrigger changes
  useEffect(() => {
    const fetchMemes = async () => {
      const fetchedMemes = await client.getAllMemes();

      setMemes(fetchedMemes);
    };

    fetchMemes();
  }, [refreshTrigger]);

  const openEditModal = (meme: Meme) => {
    setMemeToEdit(meme);
    editDisclosure.onOpen();
  };

  // Function to trigger a refresh
  const refreshMemes = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const renderCell = React.useCallback((meme: Meme, columnKey: string) => {
    const cellValue = meme[columnKey as keyof Meme];

    if (columnKey === "actions") {
      return <Button onPress={() => openEditModal(meme)}>Edit</Button>;
    }

    return cellValue;
  }, []);

  return (
    <>
      {memeToEdit && (
        <EditModal
          disclosure={editDisclosure}
          meme={memeToEdit}
          onUpdate={refreshMemes}
        />
      )}
      <AddModal disclosure={addDisclosure} onSuccess={refreshMemes} />
      <div className="mb-4 flex gap-2">
        <Button color="primary" onPress={addDisclosure.onOpen}>
          Add Meme
        </Button>
        <Button color="secondary" onPress={refreshMemes}>
          Refresh Memes
        </Button>
      </div>
      <Table aria-label="Memes table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={memes}>
          {(meme) => (
            <TableRow key={meme.id}>
              {(columnKey) => (
                <TableCell>{renderCell(meme, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
