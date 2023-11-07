import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverLink } from "../main";
import { toast } from "react-hot-toast";
import TodoLists from "../components/TodoLists";
import { AppContext } from "../components/AppContextProvider";
import { Navigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";

interface Task {
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
  }

function CompletedTasks() {
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuth } = useContext(AppContext);

  const updateHandler = async (id: string) => {
    try {
      const { data } = await axios.put(
        `${serverLink}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const { data } = await axios.delete(`${serverLink}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
    }
  };


  const getCompletedTasks = async () => {
    try {
      let { data } = await axios.get(`${serverLink}/task/getAllTask`, {
        withCredentials: true,
      });
      const completed = data.userTasks.filter((task: Task) => task.isCompleted);
      setCompletedTasks(completed);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getCompletedTasks();
  }, [refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div className="sub-Container" style={{  }}>
      <TableContainer>
        <Table variant="simple" width={"80%"} m={"auto"} mt={"2rem"}>
          <Thead bg="blue.600">
            <Tr>
              <Th color="white">Title</Th>
              <Th color="white">Description</Th>
              <Th color="white">status </Th>
              <Th color="white">delete </Th>
            </Tr>
          </Thead>

          {completedTasks.map((task) => {
            return (
              <TodoLists
                key={task._id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                id={task._id}
              />
            );
          })}
        </Table>
      </TableContainer>
    </div>
  );
}

export default CompletedTasks;