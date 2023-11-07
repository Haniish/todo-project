import { useContext, useEffect, useState } from "react";
import { ReactNode } from 'react';
import axios from "axios";
import { AppContext } from "../components/AppContextProvider";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { serverLink } from "../main";
import { Box, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue, VStack, Heading, Text, Spacer } from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons';

interface StatGroupProps {
  children: ReactNode;
}

interface User {
  name?: string;
  email?: string;
}

interface Task {
  _id: string;
  isCompleted: boolean;
}

const StatGroup: React.FC<StatGroupProps> = ({ children }) => {
  return <Flex justifyContent="space-between">{children}</Flex>;
};

function Profile() {
  const { user, isAuth, loading } = useContext(AppContext);
  const [taskInfo, setTaskInfo] = useState({ total: 0, completed: 0, completionRate: 0 });

  useEffect(() => {
    if (isAuth) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(`${serverLink}/task/getAllTask`, {
            withCredentials: true,
          });
          const tasks: Task[] = response.data.userTasks;
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(task => task.isCompleted).length;
          const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

          setTaskInfo({
            total: totalTasks,
            completed: completedTasks,
            completionRate: completionRate,
          });
        } catch (error) {
          console.error('Error fetching tasks:', error);
          // Handle error, e.g., show notification
        }
      };

      fetchTasks();
    }
  }, [isAuth]);

  if (!isAuth) return <Navigate to="/login" />;

  return loading ? (
    <Loader />
  ) : (
    <Box maxW="sm" m="auto" p="6" mt="6" boxShadow="lg" borderRadius="md" bg={useColorModeValue('white', 'gray.700')}>
      <VStack spacing="4" align="stretch">
        <Heading as="h3" size="lg" textAlign="center">{(user as User).name}</Heading>
        <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">{(user as User).email}</Text>
        <Spacer />
        <StatGroup>
          <Stat>
            <StatLabel>Total Tasks</StatLabel>
            <StatNumber>{taskInfo.total}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Tasks Completed</StatLabel>
            <StatNumber>{taskInfo.completed}</StatNumber>
            <StatHelpText>
              <StatArrow type={taskInfo.completionRate > 0 ? "increase" : "decrease"} />
              {taskInfo.completionRate.toFixed(2)}%
            </StatHelpText>
          </Stat>
        </StatGroup>
        <Flex align="center" justify="center" mt="4">
          <CheckCircleIcon w={8} h={8} color={taskInfo.completionRate === 100 ? "green.500" : "gray.500"} />
          <Text fontSize="xl" color={taskInfo.completionRate === 100 ? "green.500" : "gray.500"} ml="2">
            {taskInfo.completionRate === 100 ? "All tasks completed!" : "Keep going!"}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
}





export default Profile;
