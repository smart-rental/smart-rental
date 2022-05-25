import axios from "axios";

const url = 'http://localhost:5000/api';

// User
export const createUser = (userInfo) => axios.post(`${url}/users`, userInfo);
export const getUsers = () => axios.get(`${url}/auth`);
export const validateUser = () => axios.post(`${url}/auth`);
// Property
export const addProperty = (id, propertyToAdd) => axios.post(`${url}/property/${id}`, propertyToAdd);
