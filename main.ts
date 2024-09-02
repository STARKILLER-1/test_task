class WindowManager {
  private app: HTMLElement;
  private windowCount: number = 0;
  private ZindexCounter: number = 1;
  constructor() {
    this.app = document.getElementById("app")!;
    document
      .getElementById("openWindow")!
      .addEventListener("click", () => this.createWindow());
  }
  toggleMinimize(window: HTMLElement): void {
    window.classList.toggle("window-minimized");
  }
  closeWindow(window: HTMLElement): void {
    window.remove();
  }
  bringToFront(window: HTMLElement): void {
    this.ZindexCounter++;
    window.style.zIndex = this.ZindexCounter.toString();
  }
  makeResizable(window: HTMLElement) {
    const resizer: HTMLDivElement = document.createElement("div");
    resizer.className = "window-resizer";
    window.appendChild(resizer);
    let isResizing: boolean = false;
    let startX: number = 0;
    let startY: number = 0;
    let startWidth: number = 0;
    let startHeight: number = 0;
    resizer.addEventListener("mousedown", (e) => {
      isResizing = true;
      this.bringToFront(window);
      startX = e.clientX;
      startY = e.clientY;
      startWidth = window.offsetWidth;
      startHeight = window.offsetHeight;
    });
    document.addEventListener("mousemove", (e) => {
      if (isResizing) {
        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);
        window.style.width = `${width}px`;
        window.style.height = `${height}px`;
      }
    });
    document.addEventListener("mouseup", () => {
      isResizing = false;
    });
  }
  makeDraggable(window: HTMLElement, header: HTMLElement) {
    let isDragging: boolean = false;
    let offsetX: number = 0;
    let offsetY: number = 0;
    header.addEventListener("mousedown", (e) => {
      this.bringToFront(window);
      isDragging = true;
      offsetX = e.clientX - window.getBoundingClientRect().left;
      offsetY = e.clientY - window.getBoundingClientRect().top;
    });
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
      }
    });
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }
  createWindow() {
    const windowElement: HTMLDivElement = document.createElement("div");
    windowElement.className = "window";
    windowElement.style.top = `${50 + this.windowCount * 20}px`;
    windowElement.style.left = `${50 + this.windowCount * 20}px`;

    const header: HTMLDivElement = document.createElement("div");
    header.className = "window-header";

    const title: HTMLSpanElement = document.createElement("span");
    title.textContent = `Window ${this.windowCount + 1}`;
    header.append(title);
    const buttons: HTMLDivElement = document.createElement("div");
    header.appendChild(buttons);
    const minimizeButton: HTMLButtonElement = document.createElement("button");
    minimizeButton.className = "window-button-toggle";
    minimizeButton.textContent = "_";
    minimizeButton.addEventListener("click", () =>
      this.toggleMinimize(windowElement)
    );
    buttons.appendChild(minimizeButton);
    const closeButton: HTMLButtonElement = document.createElement("button");
    closeButton.className = "window-button-close";
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () =>
      this.closeWindow(windowElement)
    );
    buttons.appendChild(closeButton);
    windowElement.appendChild(header);
    const content: HTMLDivElement = document.createElement("div");
    content.className = "window-content";
    content.textContent =
      "Это окно можно перемещать и вообще это тестовый тест";
    windowElement.appendChild(content);
    this.app.appendChild(windowElement);
    this.windowCount++;
    this.makeDraggable(windowElement, header);
    this.makeResizable(windowElement);
  }
}

new WindowManager();
