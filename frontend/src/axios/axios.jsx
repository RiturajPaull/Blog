import axios from "axios";
import { baseURL } from "../api/SummaryAPI";

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
