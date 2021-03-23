fx_version 'cerulean'
game 'gta5'
resource_type 'gametype' { name = 'Awesome PVP' }

server_script 'dist/server/*.server.js'

--client_scipt "dist/client/*.client.js"
client_scripts {
    "coords.lua",
    "utils/client/*.lua",
    "dist/client/*.client.js",
    "dist/client/*/*.client.js"
} 