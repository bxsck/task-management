import axiosInstance from "./axios";
import Cookies from "js-cookie";

export const loginUser = async (username, password) => {
  const response = await axios.post("/login", { username, password });
  return response.data;
};

export const getTodoList = async (status, offset = 1, limit = 10) => {
  const accessToken = Cookies.get("access_token");
  const response = await axiosInstance.get("/todos", {
    params: {
      status,
      offset,
      limit,
      isSortTodoDateDesc: true,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
};

export const createTodo = async (todo) => {
  const accessToken = Cookies.get("access_token");
  const response = await axiosInstance.post("/todos", todo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axiosInstance.patch(`/todo-list/${id}`, todo);
  return response.data.data;
};

export const deleteTodo = async (id) => {
  const accessToken = Cookies.get("access_token");
  await axiosInstance.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
