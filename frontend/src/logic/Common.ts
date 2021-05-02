export default class Common {
    public static getFormattedDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    }
}