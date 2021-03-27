import * as Cfx from 'fivem-js';
import { cameraLocations } from "../";

export class Cameras {
  public static cameraActive: boolean 
  public static createdCamera: number
  public static camIndex: number
  private static scaleformTick: number
  public static setUpCameraUtils(): void {
    RegisterCommand("openCamera", () => {
      if (Cameras.cameraActive) {
        Cameras.CloseCamera()
      } else {
        Cameras.openCamera()
      }
    }, false)
    
    RegisterCommand("scrollCameraRight", () => {
      if (Cameras.cameraActive) {
        Cameras.ChangeCamera(Cameras.camIndex + 1)
      }
    }, false)
    
    RegisterCommand("scrollCameraLeft", () => {
      if (Cameras.cameraActive) {
        Cameras.ChangeCamera(Cameras.camIndex - 1)
      }
    }, false)
    
    RegisterKeyMapping('openCamera', 'Open your camera', 'keyboard', 'b')
    RegisterKeyMapping('scrollCameraRight', 'Next camera', 'keyboard', 'e')
    RegisterKeyMapping('scrollCameraLeft', 'Previous camera', 'keyboard', 'q')
    
  }
  public static async openCamera(): Promise<void> {
    this.ChangeCamera(0)
    const instructions = await Cameras.CreateInstructionScaleform("instructional_buttons")
    Cameras.scaleformTick = setTick(() => {DrawScaleformMovieFullscreen(instructions, 255, 255, 255, 255, 0)})
    this.camIndex = 0
    SetTimecycleModifier("scanline_cam_cheap")
    SetTimecycleModifierStrength(2.0)
    SendNuiMessage(JSON.stringify({
      type: "cameraVisible",
      value: true,
      location: cameraLocations[0].name
    }))
    SetFocusArea(cameraLocations[0].coords.x, cameraLocations[0].coords.y, cameraLocations[0].coords.z, cameraLocations[0].coords.x, cameraLocations[0].coords.y, cameraLocations[0].coords.z)
    FreezeEntityPosition(PlayerPedId(), true)
    DisplayRadar(false)
    this.cameraActive = true
    
  }
  
  public static CloseCamera(): void {
    DestroyCam(this.createdCamera, false)
    ClearTimecycleModifier();
    RenderScriptCams(false, false, 1, true, true)
    this.createdCamera = 0
    SetFocusEntity(PlayerPedId())
    FreezeEntityPosition(PlayerPedId(), false)
    DisplayRadar(true)
    clearTick(Cameras.scaleformTick)
    this.cameraActive = false
    SendNuiMessage(JSON.stringify({
      type: "cameraVisible",
      value: false
    }))
  }
  
  
  public static ChangeCamera(index: number): void {
    if (!cameraLocations[index]) {
      index = 0
    } else if (index == -1) {
      index = cameraLocations.length - 1
    }
    if (this.createdCamera != 0) {
      DestroyCam(this.createdCamera, false)
      this.createdCamera = 0
    }
        const camData = cameraLocations[index]
        const cam: number = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
        SetCamCoord(cam, camData.coords.x, camData.coords.y, camData.coords.z)
        SetCamRot(cam, -15.0, 0.0, camData.rot, 2)
    RenderScriptCams(true, false, 0, true, true)
    SendNuiMessage(JSON.stringify({
      type: "setCamLocation",
      location: camData.name
    }))
        this.createdCamera = cam
        this.camIndex = index
  }
  
  private static InstructionButton(ControlButton: string): void {
    N_0xe83a3e3557a56640(ControlButton)
  }
  
  
  private static InstructionButtonMessage(text: string): void {
    BeginTextCommandScaleformString("STRING")
    AddTextComponentScaleform(text)
    EndTextCommandScaleformString()
  }
    
  private static async loadScaleForm(scaleform: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const interval = setInterval(() => { if (HasScaleformMovieLoaded(scaleform)) { resolve(); clearInterval(interval) }}, 10)
    })
    }
  private static async CreateInstructionScaleform(scf: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const scaleform = RequestScaleformMovie(scf)
      Cameras.loadScaleForm(scaleform).then(() => {
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
        this.InstructionButton(GetControlInstructionalButton(1, 29, 1))
        this.InstructionButtonMessage("Close camera")
        PopScaleformMovieFunctionVoid()
      
        PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
        PushScaleformMovieFunctionParameterInt(2)
        this.InstructionButton(GetControlInstructionalButton(1, 44, 1))
        this.InstructionButtonMessage("Previous camera")
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
