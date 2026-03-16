export type SharingType = "1-sharing" | "2-sharing" | "3-sharing";

export type Room = {
  id: number;
  roomNumber: string;
  sharingType: SharingType;
};

