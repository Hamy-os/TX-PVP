import * as Cfx from 'fivem-js';
import { cameraLocations } from "../";

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
        console.log("Switching to next camera")
        Cameras.ChangeCamera(Cameras.camIndex + 1)
      }
    }, false)
    
    RegisterCommand("scrollCameraLeft", () => {
      if (Cameras.cameraActive) {
        console.log("Switching to previous camera")
        Cameras.ChangeCamera(Cameras.camIndex - 1)
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
    console.log("Switching to camera index: ", index)
    if (!cameraLocations[index]) {
      console.log("Resetting index to 0")
      index = 0
    } else if (index == -1) {
      index = cameraLocations.length - 1
    }
    if (this.createdCamera != 0) {
      console.log("Destroying cam")
      DestroyCam(this.createdCamera, false)
      this.createdCamera = 0
    }
        const camData = cameraLocations[index]
        const cam: number = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
        console.log("Created new camera")
        SetCamCoord(cam, camData.coords.x, camData.coords.y, camData.coords.z)
        SetCamRot(cam, -15.0, 0.0, camData.rot, 2)
        RenderScriptCams(true, false, 0, true, true)
        this.createdCamera = cam
        this.camIndex = index
    console.log("Switched to camera index: ", this.camIndex)

  }
  
  public static InstructionButton(ControlButton: string): void {
    N_0xe83a3e3557a56640(ControlButton)
  }
  
  
  public static InstructionButtonMessage(text: string): void {
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
