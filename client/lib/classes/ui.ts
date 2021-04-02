

export class Ui {
  protected static textEntries: string[] = [];

  public static Notification = class {
    public static onMap(text: string, important=true, saveIntoBrief=false): void {
      if (!Ui.textEntries.includes(text)) {
        AddTextEntry(text, text)
        Ui.textEntries.push(text)
      }
      SetNotificationTextEntry(text)
      AddTextComponentString(text)
      DrawNotification(important, saveIntoBrief)
    }
  }

  public static Scaleform = class {
    private static InstructionButton(ControlButton: string): void {
      N_0xe83a3e3557a56640(ControlButton)
    }
    
    
    private static InstructionButtonMessage(text: string): void {
      BeginTextCommandScaleformString("STRING")
      AddTextComponentScaleform(text)
      EndTextCommandScaleformString()
    }

    public static async loadScaleForm(scaleform: number): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        const interval = setInterval(() => { if (HasScaleformMovieLoaded(scaleform)) { resolve(); clearInterval(interval) }}, 10)
      })
    }
    public static async CreateInstructionScaleformForCamera(scf: string): Promise<number> {
      return new Promise<number>((resolve, reject) => {
        const scaleform = RequestScaleformMovie(scf)
        Ui.Scaleform.loadScaleForm(scaleform).then(() => {
          PushScaleformMovieFunction(scaleform, "CLEAR_ALL")
          PopScaleformMovieFunctionVoid()
          
          PushScaleformMovieFunction(scaleform, "SET_CLEAR_SPACE")
          PushScaleformMovieFunctionParameterInt(200)
          PopScaleformMovieFunctionVoid()
        
          PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
          PushScaleformMovieFunctionParameterInt(0)
          this.InstructionButton(GetControlInstructionalButton(1, 38, 1))
          this.InstructionButtonMessage("Next camera")
          PopScaleformMovieFunctionVoid()
  
          PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
          PushScaleformMovieFunctionParameterInt(1)
          this.InstructionButton(GetControlInstructionalButton(1, 44, 1))
          this.InstructionButtonMessage("Previous camera")
          PopScaleformMovieFunctionVoid()
  
          PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
          PushScaleformMovieFunctionParameterInt(2)
          this.InstructionButton(GetControlInstructionalButton(1, 29, 1))
          this.InstructionButtonMessage("Close camera")
          PopScaleformMovieFunctionVoid()
  
          PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
          PushScaleformMovieFunctionParameterInt(3)
          this.InstructionButton(GetControlInstructionalButton(1, 249, 1))
          this.InstructionButtonMessage("Toggle night vision")
          PopScaleformMovieFunctionVoid()
        
        
        
          PushScaleformMovieFunction(scaleform, "DRAW_INSTRUCTIONAL_BUTTONS")
          PopScaleformMovieFunctionVoid()
        
          PushScaleformMovieFunction(scaleform, "SET_BACKGROUND_COLOUR")
          PushScaleformMovieFunctionParameterInt(0)
          PushScaleformMovieFunctionParameterInt(0)
          PushScaleformMovieFunctionParameterInt(0)
          PushScaleformMovieFunctionParameterInt(80)
          PopScaleformMovieFunctionVoid()
        
          resolve(scaleform)
        })
      })
    }
  }
  
}
