import { LOG_IN, LOG_OUT, ADD_ITEMS } from "./action-types.js";
export function loginUser(payload) {
  console.log("Dispatching in addUser...");
  return { type: LOG_IN, payload };
}

export function logoutUser() {
  console.log("Dispatching in removeUser...");
  return { type: LOG_OUT };
}

export function addItems(payload) {
  console.log("Dispatching in addItems...");
  return { type: ADD_ITEMS, payload };
}
