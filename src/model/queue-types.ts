export const QueueStatus = ["waiting", "on-progress", "done"] as const;

export type TQueueStatus = (typeof QueueStatus)[number];
