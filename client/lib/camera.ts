import * as Cfx from 'fivem-js';
import { cameraLocations } from "./";

export class Cameras {
  public static cameraActive: boolean 
  public static createdCamera: number
  public static camIndex: number
  public static setUpCameraUtils(): void {
    RegisterCommand("openCamera", () => {
      Cameras.openCamera()
    }, false)
    
    RegisterCommand("closeCamera", () => {
      Cameras.CloseCamera()
    }, false)
    
    RegisterCommand("scrollCameraRight", () => {
      if (Cameras.cameraActive) {
        Cameras.ChangeCamera(Cameras.camIndex++)
      }
    }, false)
    
    RegisterCommand("scrollCameraLeft", () => {
      if (Cameras.cameraActive) {
        Cameras.ChangeCamera(Cameras.camIndex--)
      }
    }, false)
    
    RegisterKeyMapping('openCamera', 'Open your camera', 'keyboard', 'b')
    RegisterKeyMapping('closeCamera', 'Close your camera', 'keyboard', 'n')
    RegisterKeyMapping('scrollCameraRight', 'Next camera', 'keyboard', 'e')
    RegisterKeyMapping('scrollCameraLeft', 'Previous camera', 'keyboard', 'q')
    
  }
  public static openCamera(): void {
    console.log("Opening camera")
    this.ChangeCamera(0)
    this.camIndex = 0
    SetFocusArea(cameraLocations[0].coords.x, cameraLocations[0].coords.y, cameraLocations[0].coords.z, cameraLocations[0].coords.x, cameraLocations[0].coords.y, cameraLocations[0].coords.z)
    FreezeEntityPosition(PlayerPedId(), true)
    DisplayRadar(false)
    this.cameraActive = true
    
  }
  
  public static CloseCamera(): void {
    console.log("Closing camera, curr cam id: ", this.createdCamera)
    DestroyCam(this.createdCamera, false)
    RenderScriptCams(false, false, 1, true, true)
    this.createdCamera = 0
    ClearTimecycleModifier()
    SetFocusEntity(PlayerPedId())
    FreezeEntityPosition(PlayerPedId(), false)
    DisplayRadar(true)
    this.cameraActive = false
  }
  
  
  public static ChangeCamera(index: number): void {
    if (!cameraLocations[index]) {
      index = 0
    } else if (index == 0) {
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
        Wait(250)
        this.createdCamera = cam
        this.camIndex = index
  }
  
  public static InstructionButton(ControlButton: string): void {
    N_0xe83a3e3557a56640(ControlButton)
  }
  
  
  public static InstructionButtonMessage(text: string) {
    BeginTextCommandScaleformString("STRING")
    AddTextComponentScaleform(text)
    EndTextCommandScaleformString()
  }
    
  
  public static CreateInstuctionScaleform(scf: string): number {
    const scaleform = RequestScaleformMovie(scf)
    while (!HasScaleformMovieLoaded(scaleform)) {
      Wait(10)
    }
    PushScaleformMovieFunction(scaleform, "CLEAR_ALL")
    PopScaleformMovieFunctionVoid()
    
    PushScaleformMovieFunction(scaleform, "SET_CLEAR_SPACE")
    PushScaleformMovieFunctionParameterInt(200)
    PopScaleformMovieFunctionVoid()
  
    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
    PushScaleformMovieFunctionParameterInt(0)
    this.InstructionButton(GetControlInstructionalButton(1, 175, 1))
    this.InstructionButtonMessage("Go Forward")
    PopScaleformMovieFunctionVoid()
  
    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
    PushScaleformMovieFunctionParameterInt(1)
    this.InstructionButton(GetControlInstructionalButton(1, 194, 1))
    this.InstructionButtonMessage("Close Camera")
    PopScaleformMovieFunctionVoid()
  
    PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
    PushScaleformMovieFunctionParameterInt(2)
    this.InstructionButton(GetControlInstructionalButton(1, 174, 1))
    this.InstructionButtonMessage("Go Back")
    PopScaleformMovieFunctionVoid()
  
    PushScaleformMovieFunction(scaleform, "DRAW_INSTRUCTIONAL_BUTTONS")
    PopScaleformMovieFunctionVoid()
  
    PushScaleformMovieFunction(scaleform, "SET_BACKGROUND_COLOUR")
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(0)
    PushScaleformMovieFunctionParameterInt(80)
    PopScaleformMovieFunctionVoid()
  
    return scaleform
  }
  
 
}
