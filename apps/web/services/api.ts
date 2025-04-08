import axios from "axios";

export const api = axios.create({
  baseURL: 'http://ec2-3-15-3-94.us-east-2.compute.amazonaws.com:3000/'
})