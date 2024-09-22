import express from "express";
import { getRequest, postRequest } from "../controllers/user.controllers.js";

const routes = express.Router();

routes.post('/', postRequest)
routes.get('/', getRequest)
export default routes