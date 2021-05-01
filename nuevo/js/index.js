import { make, the } from './wetrust.js'

the("goInicio").onclick = function(){
    the("portada").classList.add("d-none");
    the("inicio").classList.remove("d-none")
}