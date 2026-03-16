import { getRoomTenants, listRooms } from "../services/roomService.js";

export function getRooms(_request, response, next) {
  try {
    response.json({
      data: listRooms()
    });
  } catch (error) {
    next(error);
  }
}

export function getRoomTenantsById(request, response, next) {
  try {
    response.json({
      data: getRoomTenants(Number(request.params.id))
    });
  } catch (error) {
    next(error);
  }
}
