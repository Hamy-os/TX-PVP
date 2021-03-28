

export class Notification {
  private static textEntries: string[] = []
  
  public static onMap(text: string) {
    if (!Notification.textEntries.includes(text)) {
      AddTextEntry(text, text)
      Notification.textEntries.push(text)
    }
    SetNotificationTextEntry(text)
    AddTextComponentString(text)
    DrawNotification(true, false)
  }
}