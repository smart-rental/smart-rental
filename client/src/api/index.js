import axios from "axios";

const url = 'http://localhost:5000/api';

// User
export const createUser = (userInfo) => axios.post(`${url}/users`, userInfo);
export const getUsers = () => axios.get(`${url}/auth`);
export const validateUser = (userInfo) => axios.post(`${url}/auth`, userInfo);
// Property
export const addProperty = (id, propertyToAdd) => axios.post(`${url}/property/${id}`, propertyToAdd);
export const getProperty = (id) => axios.get( `${url}/property/${id}`);
export const deleteProperty = (id) => axios.delete( `${url}/property/${id}`);
export const updateProperty = (id) => axios.post( `${url}/property/update/${id}`);