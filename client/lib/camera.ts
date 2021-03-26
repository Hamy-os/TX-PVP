import * as Cfx from 'fivem-js';
import { cameraLocations } from "./";
let cameraActive = false
let createdCamera  = 0
let camIndex = 0
export function setUpCameraUtils(): void {
  RegisterCommand("openCamera", () => {
    openCamera()
  }, false)
  
  RegisterCommand("closeCamera", () => {
    CloseCamera()
  }, false)
  
  RegisterCommand("scrollCameraRight", () => {
    if (cameraActive) {
      ChangeCamera(camIndex++)
    }
  }, false)
  
  RegisterCommand("scrollCameraLeft", () => {
    if (cameraActive) {
      ChangeCamera(camIndex--)
    }
  }, false)
  
  RegisterKeyMapping('openCamera', 'Open your camera', 'keyboard', 'b')
  RegisterKeyMapping('closeCamera', 'Close your camera', 'keyboard', 'n')
  RegisterKeyMapping('scrollCameraRight', 'Next camera', 'keyboard', 'e')
  RegisterKeyMapping('scrollCameraLeft', 'Previous camera', 'keyboard', 'q')
  
}



function openCamera() {
  console.log("Opening camera")
  ChangeCamera(0)

  camIndex = 0
  SetFocusArea(cameraLocations[0].coords.x, cameraLocations[0].coords.y, cameraLocations[0].coords.z, cameraLocations[0].coords.x, cameraLocations[0].coords.y, cameraLocations[0].coords.z)
  FreezeEntityPosition(PlayerPedId(), true)
  DisplayRadar(false)
  cameraActive = true
  
}

function CloseCamera(): void {
  console.log("Closing camera, curr cam id: ", createdCamera)
  DestroyCam(createdCamera, false)
	RenderScriptCams(false, false, 1, true, true)
  createdCamera = 0
  ClearTimecycleModifier()
  SetFocusEntity(PlayerPedId())
  FreezeEntityPosition(PlayerPedId(), false)
  DisplayRadar(true)
  cameraActive = false
}


function ChangeCamera(index: number): void {
  if (!cameraLocations[index]) {
    index = 0
  } else if (index == 0) {
    index = cameraLocations.length - 1
  }
  if (createdCamera != 0) {
    DestroyCam(createdCamera, false)
    createdCamera = 0
  }
      const camData = cameraLocations[index]
      const cam: number = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
      SetCamCoord(cam, camData.coords.x, camData.coords.y, camData.coords.z)
      SetCamRot(cam, -15.0, 0.0, camData.rot, 2)
      RenderScriptCams(true, false, 0, true, true)
      Wait(250)
  createdCamera = cam
  camIndex = index
}

function InstructionButton(ControlButton: string): void {
  N_0xe83a3e3557a56640(ControlButton)
}


function InstructionButtonMessage(text: string) {
  BeginTextCommandScaleformString("STRING")
  AddTextComponentScaleform(text)
  EndTextCommandScaleformString()
}
  

function CreateInstuctionScaleform(scf: string) {
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
  InstructionButton(GetControlInstructionalButton(1, 175, 1))
  InstructionButtonMessage("Go Forward")
  PopScaleformMovieFunctionVoid()

  PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
  PushScaleformMovieFunctionParameterInt(1)
  InstructionButton(GetControlInstructionalButton(1, 194, 1))
  InstructionButtonMessage("Close Camera")
  PopScaleformMovieFunctionVoid()

  PushScaleformMovieFunction(scaleform, "SET_DATA_SLOT")
  PushScaleformMovieFunctionParameterInt(2)
  InstructionButton(GetControlInstructionalButton(1, 174, 1))
  InstructionButtonMessage("Go Back")
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
