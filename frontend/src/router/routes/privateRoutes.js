import { adminRoute } from "./adminRoutes";
import { customerRoute } from "./customerRoutes";

export const privateRoute = [...adminRoute, ...customerRoute];
