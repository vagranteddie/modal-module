import {Injectable, ViewContainerRef, ComponentRef} from "@angular/core";
import {ModalDialog} from "./modal-window";
import {ContentRef} from "./util";
@Injectable()
export class ActiveModalDialog {
    close(result: any): void {
    }

    dismiss(reason: any): void {
    }
}

@Injectable()
export class ModalDialogRef {

    private resolve: (result?: any) => void;
    private reject: (reason?: any) => void;

    result: Promise<any>;

    get componentInstance(): any {
        if (this.contentRef.componentRef) {
            return this.contentRef.componentRef.instance;
        }
    }

    set componentInstance(instance: any) {
    }

    constructor(private viewContainerRef: ViewContainerRef, private windowCmptRef: ComponentRef<ModalDialog>,
        private contentRef: ContentRef
    ) {
        windowCmptRef.instance.dismissEvent.subscribe((reason: any) => {
            this.dismiss(reason);
        });
        this.result = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.result.then(null, () => {
        });
    }

    close(result: any): void {
        if (this.windowCmptRef) {
            this.resolve(result);
            this.removeModalElements();
        }
    }

    dismiss(reason: any): void {
        if (this.windowCmptRef) {
            this.reject(reason);
            this.removeModalElements();
        }
    }

    private removeModalElements() {
        if (this.contentRef && this.contentRef.viewRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.contentRef.viewRef));
        }
        if (this.windowCmptRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.windowCmptRef.hostView))
        }
        this.windowCmptRef = null;
        this.contentRef = null;
    }

}