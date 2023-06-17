interface IDevice {
  notificationToken: string;
  deviceOs: string;
  deviceBrowser: string;
  deviceId: string;
  manufacturer: string;
  osVersion: string;
  model: string;
  hardwareSerialNumber: string;
}

export interface IGuard {
  ip: string;
  device: IDevice;
  header: object;
  source: string;
  origin: string;
  acceptLanguage: string;
  token: string;
  refreshToken: string;
  payload: object;
}