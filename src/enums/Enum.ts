import z from "zod";

export const ScheduledStatusEnum = z.enum(["scheduled", "completed", "failed"]);
export type ScheduledStatus = z.infer<typeof ScheduledStatusEnum>;