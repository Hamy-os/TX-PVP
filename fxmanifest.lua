fx_version 'cerulean'
game 'gta5'


server_script 'dist/server/*.server.js'

--client_scipt "dist/client/*.client.js"
client_scripts {
    "utils/client/map.lua",
    "dist/client/*.client.js"
} 