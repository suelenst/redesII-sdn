import ServicoRest from "../ServicoRest";

export default class FlowService extends  ServicoRest {
        constructor(){
            super("wm/staticflowpusher/json");
        }
        
}