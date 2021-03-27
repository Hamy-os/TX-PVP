import * as Cfx from 'fivem-js';
import { Vector3 } from 'fivem-js';
import { cameraLocations, castVec3, casMatrix} from "../";
export const Keys = {
	["ESC"] : 322, ["F1"] : 288, ["F2"] : 289, ["F3"] : 170, ["F5"] : 166, ["F6"] : 167, ["F7"] : 168, ["F8"] : 169, ["F9"] : 56, ["F10"] : 57,
	["~"] : 243, ["1"] : 157, ["2"] : 158, ["3"] : 160, ["4"] : 164, ["5"] : 165, ["6"] : 159, ["7"] : 161, ["8"] : 162, ["9"] : 163, ["-"] : 84, [":"] : 83, ["BACKSPACE"] : 177,
	["TAB"] : 37, ["Q"] : 44, ["W"] : 32, ["E"] : 38, ["R"] : 45, ["T"] : 245, ["Y"] : 246, ["U"] : 303, ["P"] : 199, ["["] : 39, ["]"] : 40, ["ENTER"] : 18,
	["CAPS"] : 137, ["A"] : 34, ["S"] : 8, ["D"] : 9, ["F"] : 23, ["G"] : 47, ["H"] : 74, ["K"] : 311, ["L"] : 182,
	["LEFTSHIFT"] : 21, ["Z"] : 20, ["X"] : 73, ["C"] : 26, ["V"] : 0, ["B"] : 29, ["N"] : 249, ["M"] : 244, [","] : 82, ["."] : 81,
	["LEFTCTRL"] : 36, ["LEFTALT"] : 19, ["SPACE"] : 22, ["RIGHTCTRL"] : 70,
	["HOME"] : 213, ["PAGEUP"] : 10, ["PAGEDOWN"] : 11, ["DELETE"] : 178,
	["LEFT"] : 174, ["RIGHT"] : 175, ["TOP"] : 27, ["DOWN"] : 173,
	["NENTER"] : 201, ["N4"] : 108, ["N5"] : 60, ["N6"] : 107, ["N+"] : 96, ["N-"] : 97, ["N7"] : 117, ["N8"] : 61, ["N9"] : 118
}
export class Cameras {
  public static cameraActive: boolean 
  public static createdCamera: number
  public static camIndex: number
  private static scaleformTick: number
  private static isNightVisionOn = false
  private static angleY = 0.0
  private static angleZ = 0.0
  
  public static setUpCameraUtils(): void {
    RegisterCommand("openCamera", () => {
      if (Cameras.cameraActive) {
        Cameras.CloseCamera()
      } else {
        Cameras.openCamera(Cameras.camIndex || 0)
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
    RegisterCommand("cameraNightVision", () => {
      if (Cameras.cameraActive) {
        Cameras.ToggleNightVisison(!Cameras.isNightVisionOn)
      }
    }, false)



    RegisterKeyMapping('openCamera', 'Open your camera', 'keyboard', 'b')
    RegisterKeyMapping('scrollCameraRight', 'Next camera', 'keyboard', 'e')
    RegisterKeyMapping('scrollCameraLeft', 'Previous camera', 'keyboard', 'q')
    RegisterKeyMapping('cameraNightVision', 'Toggle camera night visison', 'keyboard', 'n')

    
  }
  public static async openCamera(index = 0): Promise<void> {
    this.ChangeCamera(index)
    const instructions = await Cameras.CreateInstructionScaleform("instructional_buttons")
    Cameras.scaleformTick = setTick(() => { DrawScaleformMovieFullscreen(instructions, 255, 255, 255, 255, 0), Cameras.rotate()})
    this.camIndex = 0
    SetTimecycleModifier("scanline_cam_cheap")
    SetTimecycleModifierStrength(2.0)
    SendNuiMessage(JSON.stringify({
      type: "cameraVisible",
      value: true,
      location: cameraLocations[index].name
    }))
    SetFocusArea(cameraLocations[index].coords.x, cameraLocations[index].coords.y, cameraLocations[index].coords.z, cameraLocations[index].coords.x, cameraLocations[index].coords.y, cameraLocations[index].coords.z)
    FreezeEntityPosition(PlayerPedId(), true)
    DisplayRadar(false)
    this.cameraActive = true
    
  }
  public static ToggleNightVisison(toggle: boolean): void {
    Cameras.isNightVisionOn = toggle
    SetNightvision(toggle)
  }
  public static CloseCamera(): void {
    DestroyCam(this.createdCamera, false)
    ClearTimecycleModifier();
    Cameras.ToggleNightVisison(false)
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
  
  public static rotate(): void {
    const getCameraRot = castVec3(GetCamRot(Cameras.createdCamera, 2))
    HideHudComponentThisFrame(7)
    HideHudComponentThisFrame(22)
    HideHudComponentThisFrame(19)
    HideHudComponentThisFrame(20)
    DisableControlAction(2, 24, true)
			DisableControlAction(2, 257, true)
			DisableControlAction(2, 25, true)
			DisableControlAction(2, 263, true)
			DisableControlAction(2, Keys['R'], true)
			DisableControlAction(2, Keys['SPACE'], true)
			DisableControlAction(2, Keys['TAB'], true)
			DisableControlAction(2, Keys['F'], true)
    if (IsControlPressed(1, 174)) {
      SetCamRot(Cameras.createdCamera, getCameraRot.x, 0.0, getCameraRot.z + 0.7, 2)
    }

    if (IsControlPressed(1, 175)) {
      SetCamRot(Cameras.createdCamera, getCameraRot.x, 0.0, getCameraRot.z - 0.7, 2)
    }
    if (IsControlPressed(1, 173)) {
      SetCamRot(Cameras.createdCamera, getCameraRot.x  - 0.7, 0.0, getCameraRot.z, 2)
    }
    if (IsControlPressed(1, 172)) {
      SetCamRot(Cameras.createdCamera, getCameraRot.x  + 0.7, 0.0, getCameraRot.z, 2)
    }
    
  }
  public static ChangeCamera(index: number): void {
    if (index == -1) {
      index = cameraLocations.length - 1
    } else if (!cameraLocations[index]) {
      index = 0
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
  /* Didnt work yet, but I wont toss it out
  private static getPoint(): void {
    let mouseX = 0.0
    let mouseY = 0.0
    if (IsInputDisabled(0)) {
      mouseX = GetDisabledControlNormal(1, 1) * 8.0
      mouseY = GetDisabledControlNormal(1, 2) * 8.0
    }
    else {
      mouseX = GetDisabledControlNormal(1, 1) * 1.5
      mouseY = GetDisabledControlNormal(1, 2) * 1.5
    }
    // holy fucking shit, credit: https://github.com/Kiminaze/DeathCam/blob/master/client.lua
    const offset = new Vector3(Math.cos(Cameras.angleZ) * Math.cos(Cameras.angleY) + Math.cos(Cameras.angleY) * Math.cos(Cameras.angleZ) / 4,
    Math.sin(Cameras.angleZ) * Math.cos(Cameras.angleY) + Math.cos(Cameras.angleY) * Math.sin(Cameras.angleZ) / 4,
    Math.sin(Cameras.angleY) * 2
    )
    const camCoords = castVec3(GetCamCoord(Cameras.createdCamera))
    const finalCoords = new Vector3(camCoords.x + offset.x, camCoords.y + offset.y, camCoords.z + offset.z)
    SetFocusArea(finalCoords.x, finalCoords.y, finalCoords.z, 0.0, 0.0, 0.0)
    PointCamAtCoord(Cameras.createdCamera, finalCoords.x, finalCoords.y, finalCoords.z)
  }
  */
 
}
