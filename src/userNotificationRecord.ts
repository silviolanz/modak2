export type UserNotificationRecord = {
    count: number;
    lastSentTime: Date;
};

export const createUserNotificationRecord = (): UserNotificationRecord => ({
    count: 0,
    lastSentTime: new Date(),
});
