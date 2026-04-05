export default class RenderMarkupList {
  Render(container, time) {
    this.li = document.createElement("li");
    this.li.textContent = time;

    container.appendChild(this.li);
  }
}
