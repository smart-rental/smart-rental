import axios from "axios";

const url = 'http://localhost:5000/api';

// User
export const createUser = (userInfo) => axios.post(`${url}/users`, userInfo);
export const getUsers = () => axios.get(`${url}/auth`);
export const validateUser = (userInfo) => axios.post(`${url}/auth`, userInfo);
// Property
export const addProperty = (id, propertyToAdd) => axios.post(`${url}/property/${id}`, propertyToAdd);
export const getProperties = (id) => axios.get( `${url}/property/${id}`);
export const getProperty = (ownerId, propertyId) => axios.get( `${url}/property/${ownerId}/${propertyId}`);
export const getPropertyByID = (propertyId) => axios.get( `${url}/property/locate/${propertyId}`);
export const deleteProperty = (id) => axios.delete( `${url}/property/${id}`);
export const editProperty = (ownerId, id, propertyToEdit) => axios.post( `${url}/property/update/${ownerId}/${id}`, propertyToEdit);
export const addTenant = (ownerId, propertyId, tenantToAdd) => axios.post(`${url}/property/addTenant/${ownerId}/${propertyId}`, tenantToAdd);
export const deleteTenant = (ownerId, propertyId) => axios.post(`${url}/property/deleteTenant/${ownerId}/${propertyId}`);
//Issue
export const retrieveAllIssues = () => axios.get(`${url}/issue`);
export const retrieveIssues = (tenantId) => axios.get(`${url}/issue/${tenantId}`);
export const retrieveIssue = (tenantId, issueId) => axios.get(`${url}/issue/${tenantId}/${issueId}`);
export const addIssue = (tenantId, issue) => axios.post(`${url}/issue/${tenantId}`, issue);
export const deleteIssue = (tenantId, issueId) => axios.delete(`${url}/issue/${tenantId}/${issueId}`);
export const editIssue = (tenantId, issueId, issueToEdit) => axios.patch(`${url}/issue/update/${tenantId}/${issueId}`, issueToEdit);