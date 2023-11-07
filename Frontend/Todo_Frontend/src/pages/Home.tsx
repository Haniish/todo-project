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
  Box, Button, Flex, FormControl, FormLabel, Input, Stack, useToast, VStack 
} from "@chakra-ui/react";


interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  startDate: string; // assuming ISO format for dates
  endDate: string;   // assuming ISO format for dates
}

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(""); // New state for start date
  const [endDate, setEndDate] = useState("");     // New state for end date
  const [loading, setLoading] = useState(false);
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { setIsAuth, isAuth } = useContext(AppContext);

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

  const validateDates = (start: string, end: string): boolean => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate >= endDate) {
      toast.error('Start date must be earlier than end date.');
      return false;
    }

    if (startDate < now || endDate < now) {
      toast.error('Dates cannot be in the past.');
      return false;
    }

    if (!start || !end) {
      toast.error('Both start and end dates must be provided.');
      return false;
    }

    return true;
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateDates(startDate, endDate)) {
      setLoading(false);
      return; // Stop form submission if validation fails
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${serverLink}/task/addTask`,
        {
          title,
          description,
          startDate, // Include startDate in the request
          endDate,   // Include endDate in the request
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setStartDate(""); // Reset start date
      setEndDate("");   // Reset end date
      setRefresh((prev) => !prev);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  const getAllTask = async () => {
    try {
      let { data } = await axios.get(`${serverLink}/task/getAllTask`, {
        withCredentials: true,
      });
      setUserTasks(data.userTasks);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("error:", error);
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getAllTask();
  }, [refresh]);

  

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local" // Use datetime-local input for date and time
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local" // Use datetime-local input for date and time
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit" disabled={loading}>ADD TASK</button>
      </form>

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

            {userTasks?.map((task) => {
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
    </div>
  );
}

export default Home;
 