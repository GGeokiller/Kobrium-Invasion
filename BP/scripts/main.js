import { world, system } from "@minecraft/server"
import "./entities/entityControl"
import "./items/itemControl"
import "./blocks/blockControl"
import "./utils/item_components"
import "./utils/particle"
import "./debug/testing"
import "./damage/damage"
import "./events/dayNight"

// system.run(() => {
//     world.sendMessage("Hello World")
// })

/// hola de geo
// hola de euforia
/// hola de geo 10/08/25 1:53 AM
// hola de euforia 10/08/25 3:14 AM
// hola de geo 10/09/25 1:45 AM (vamos a ganar esta cosa, estan quedando bien perrones los items)
// hola de euforia 10/10/ 1:27 AM simon orita lo hago
// hola de euforia (geo se olvido de esto:c ) 10/19/25 15:51 PM
/* 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢢⠀⠀⠀⠀⠈⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢡⠀⠀⠀⠀⠘
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢆⠀⠀⠀⠀⠀⠐⢔⠀⠀⠀⠀⠀⠈⠂⢣⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠱⡄⠀⠀⠀⠀⠈⠳⠢⣀⠀⠀⠀⠀⢜⡆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣾⢀⠈⠢⡀⠐⠤⢀⠀⠑⣄⣱⠦⢀⠀⠀⠙⢄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⢹⠀⠉⠒⠬⢦⡈⢆⠉⠢⢈⣇⠀⠀⠹⡖⠄⠀⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠹⡀⠀⠀⠀⠀⠈⠪⣦⠀⢠⣜⣳⣶⡞⣷⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⡏⠀⣀⣀⣠⣾⡽⠇⠀⠀⠀⠁⠈⢹⡋⡼⢣⠿⡘⢆⠀⠀
⢀⣄⠀⠀⠀⠀⠀⢸⠋⠋⠉⣿⡋⢩⠷⠀⠀⠀⠀⠀⠀⠘⢦⡸⠘⢆⡧⢼⡄⠀
⡆⢸⡀⠀⠀⠀⠀⠸⠀⠀⠀⠫⠤⠬⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⣃⠉⡂
⣷⡀⢇⢀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠟⠁⡔⠁
⠃⡗⢬⣼⡄⠀⠸⡀⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣀⡀⠀⠀⠀⣠⠋⠀⠀⠀⠀
⡼⠁⠀⠹⣿⡀⠀⢳⡸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠁⠀⠀⣀⠜⡇⠀⠀⠀⠇⠀
⠃⣀⣄⣀⢹⣧⠀⠘⢿⣟⠲⠦⢄⣀⣀⣀⣀⣀⣀⣤⣴⡾⢧⠄⢘⡆⠀⠀⠀⠀
⣞⡛⣿⣿⣿⣿⣧⡀⢸⣿⣦⣤⣼⣿⣿⣿⡿⠙⢻⣯⡀⠀⠈⢣⡀⠀⠀⠀⣶⣦

*/


