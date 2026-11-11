import "@testing-library/jest-dom/vitest";

// jsdom has <dialog> but not showModal() or close(). These stand-ins keep the open attribute and the close event, which is all the Contents dialog's unit tests read; trap, inert background and Escape are covered in Chromium by the e2e spec.
HTMLDialogElement.prototype.showModal ??= function showModal(this: HTMLDialogElement) { this.setAttribute("open", ""); };
HTMLDialogElement.prototype.close ??= function close(this: HTMLDialogElement) { if (!this.hasAttribute("open")) return; this.removeAttribute("open"); this.dispatchEvent(new Event("close")); };
