import { Router } from "express";
import { Controller } from "../controller/controller";
import { Service } from "../services/service";

const route = Router();
const service = new Service();
const controller = new Controller(service);

route.get("/", controller.health);
route.get("/harrypotter/Spells", controller.spells)
route.post("/harrypotter/Spells", controller.create)

export default route;
