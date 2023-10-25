import React from 'react';
import {
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

interface TodoListsProps {
  title: string;
  description: string;
  isCompleted: boolean;
  updateHandler: (id: string) => void;
  deleteHandler: (id: string) => void;
  id: string;
}

const TodoLists: React.FC<TodoListsProps> = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <Tbody>
      <Tr>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>{title}</Td>
        <Td textDecoration={isCompleted ? "line-through" : "none"}>
          {description}
        </Td>
        <Td>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => updateHandler(id)}
          />
        </Td>
        <Td>
          <button onClick={() => deleteHandler(id)}>
            Delete
          </button>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default TodoLists;
