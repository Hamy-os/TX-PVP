import {IDeferrals} from "../../typings"
export class Deferrals {
  public static listen(): void {
    on("playerConnecting", (name: string, setKickReason: (res: string) => void, deferrals: IDeferrals) => {
      deferrals.defer()
      setTimeout(() => {
        console.log("Sending defferal")
        deferrals.presentCard(Deferrals.defData, (data: Record<string, unknown>, raw: string) => {
          console.log("Received callback from adaptivecards")
          if (data.submitId == "connect") {
            deferrals.done()
          }
        })
      }, 500)
    })
  }
  private static defData = {
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.3",
    "body": [
        {
            "type": "Container",
            "items": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Welcome to TX-PVP!",
                            "wrap": true,
                            "color": "accent",
                            "weight": "bolder",
                            "size": "extraLarge",
                            "fontType": "Default",
                            "horizontalAlignment": "center"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "     ",
                    "wrap": true,
                    "size": "Large",
                    "weight": "Bolder",
                    "color": "Light"
                },
                {
                    "type": "TextBlock",
                    "text": "To start your PVP experience just click play, also, feel free to join our Discord.",
                    "wrap": true,
                    "color": "Accent",
                    "horizontalAlignment": "Center"
                },
                {
                    "type": "ColumnSet",
                    "height": "stretch",
                    "minHeight": "5px",
                    "bleed": true,
                    "selectAction": {
                        "type": "Action.OpenUrl"
                    },
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "ActionSet",
                                    "actions": [
                                        {
                                            "type": "Action.OpenUrl",
                                            "title": "Discord",
                                            "url": "https://discord.gg/zFSHs3GX2G",
                                            "style": "positive"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "ActionSet",
                                    "actions": [
                                        {
                                            "type": "Action.Submit",
                                            "title": "Play",
                                            "style": "positive",
                                            "id": "connect"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "ActionSet",
                                    "actions": [
                                        {
                                            "type": "Action.OpenUrl",
                                            "style": "positive",
                                            "url": "https://github.com/TXPVP/TX-PVP",
                                            "title": "Contribute!"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "horizontalAlignment": "Center"
                }
            ],
            "style": "default",
            "bleed": true,
            "height": "stretch"
        }
    ],
    "backgroundImage": {
        "horizontalAlignment": "Center"
    }
}
}