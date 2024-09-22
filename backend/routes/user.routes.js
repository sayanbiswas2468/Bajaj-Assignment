import express from "express";
import { getRequest, postRequest } from "../controllers/user.controllers.js";

const routes = express.Router();

routes.post('/bfhl', postRequest)
routes.get('bfhl', getRequest)
export default routes