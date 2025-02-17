export type TRoom = {
  id: number;
  name: string;
};

export type TAddRoomPayload = {
  name: string;
};

export type TUpdateRoomPayload = Partial<TAddRoomPayload>;
