import { Injectable } from "@angular/core";

@Injectable()
export class ToolbarService {
    visible: boolean

    constructor(){
        this.visible = false
    }

    hide(){
        this.visible = true
    }

    show(){
        this.visible = false
    }

    toggle(){
        this.visible = !this.visible
    }
}