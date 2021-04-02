import * as Cfx from 'fivem-js';
import { Vector3 } from 'fivem-js';
import { Team } from "../../typings";
import { cameraLocations, castVec3, castMatrix, Loadouts, ClientCallback, Ui } from "../";
import { Blip } from "./blip";
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
  private static coords: number[]
  private static clonedPed: number
  private static blips: Blip[] = []
  
  public static async setUpCameraUtils(): Promise<void> {
    const result = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
    if (result[0] == "NARCO") {
      RegisterCommand("openCamera", async () => {
        const result = await ClientCallback.triggerServerCallback<[Team, string]>("getPlayerTeam")
        if (result[0] == "NARCO") {
            if (Cameras.cameraActive) {
              Cameras.CloseCamera()
            } else {
              if (!IsPedInAnyVehicle(PlayerPedId(), true)) {
              Cameras.openCamera(Cameras.camIndex || 0)
              } else {
                Ui.Notification.onMap("~r~This action is forbidden while in a vehicle!")
              }
            }
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
  }
  public static async openCamera(index = 0): Promise<void> {
    const ped = PlayerPedId()
    DoScreenFadeOut(100)
    emitNet("TXPVP:CORE:ClonePlayer", GetEntityCoords(ped, false), Loadouts.model)
    emitNet("TXPVP:CORE:MaskPlayer")
    Cameras.coords = GetEntityCoords(ped, false)
    //Cameras.clonedPed = ClonePed(ped, GetEntityHeading(ped), true, true)
    this.ChangeCamera(index)
    const instructions = await Ui.Scaleform.CreateInstructionScaleformForCamera("instructional_buttons")
    Cameras.scaleformTick = setTick(() => { DrawScaleformMovieFullscreen(instructions, 255, 255, 255, 255, 0), Cameras.rotate()})
    SetTimecycleModifier("scanline_cam_cheap")
    SetTimecycleModifierStrength(2.0)
    SetFocusArea(cameraLocations[index].coords.x, cameraLocations[index].coords.y, cameraLocations[index].coords.z, cameraLocations[index].coords.x, cameraLocations[index].coords.y, cameraLocations[index].coords.z)
    FreezeEntityPosition(PlayerPedId(), true)
    this.cameraActive = true
    setTimeout(() => { DoScreenFadeIn(500),  SendNuiMessage(JSON.stringify({
      type: "cameraVisible",
      value: true,
      location: cameraLocations[index].name,
      count: cameraLocations.length,
      index: index
    })) }, 500)
    
  }
  public static ToggleNightVisison(toggle: boolean): void {
    Cameras.isNightVisionOn = toggle
    SetNightvision(toggle)
  }
  public static CloseCamera(): void {
    DoScreenFadeOut(50)
    const ped = PlayerPedId()
    emitNet("TXPVP:CORE:DeleteClone")
    emitNet("TXPVP:CORE:UnMaskPlayer")
    SetEntityInvincible(ped, false)
    SetEntityAlpha(ped, 255, 0)
    SetEntityCoords(ped, Cameras.coords[0], Cameras.coords[1], Cameras.coords[2], false, false, false, false)
    DestroyCam(this.createdCamera, false)
    ClearTimecycleModifier();
    Cameras.ToggleNightVisison(false)
    RenderScriptCams(false, false, 1, true, true)
    this.createdCamera = 0
    SetFocusEntity(PlayerPedId())
    FreezeEntityPosition(PlayerPedId(), false)
    clearTick(Cameras.scaleformTick)
    this.cameraActive = false
    setTimeout(() => { DoScreenFadeIn(500);   SendNuiMessage(JSON.stringify({
      type: "cameraVisible",
      value: false
    }))}, 500)
  }
  public static showBlips(): void {
    cameraLocations.forEach((data: { coords: Vector3, rot: number, name: string }, idx: number) => {
      const b = new Blip(data.coords, 604, 34, idx.toString(), 10, `CCTV (${data.name})`, (blipId: number) => {
        SetBlipRotation(blipId, 90)
        SetBlipCategory(blipId, 1)
        SetBlipAsFriendly(blipId, true)
        SetBlipColour(blipId, 2)
      })
      Cameras.blips.push(b)
    })
  }
  public static hideBlips(): void {
    Cameras.blips.forEach((blip: Blip) => {
      blip.delete()
    })
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
          location: camData.name,
            index
         }))
        this.createdCamera = cam
    this.camIndex = index
    const ped = PlayerPedId()
    SetEntityInvincible(ped, true)
    SetEntityAlpha(ped, 0, 0)
    SetEntityCoords(ped, cameraLocations[index].coords.x, cameraLocations[index].coords.y, cameraLocations[index].coords.z, false, false, false, false)
  }
}
