import { SOCKET_TOKEN } from "../utils/constants";
import AxiosInstance from "./ApiHandler";

export const Api = {
  leg: {
    getLegData: async () =>
      AxiosInstance.get(`/iot/sensor-data?key=${SOCKET_TOKEN}&size=9`),
    changeSensorState: async (data: { active: boolean }) =>
      AxiosInstance.post(`/iot/sensor-state?key=${SOCKET_TOKEN}`, data),
    getSensorState: async () =>
      AxiosInstance.get(`/iot/sensor-state?key=${SOCKET_TOKEN}`),
  },
};
