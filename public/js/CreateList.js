import RenderMarkupList from "./RenderMarkupList.js";

// Cria uma lista
export default function CreateList(list) {
  const container = document.getElementById("list_save");
  if (!container) return;

  container.innerHTML = "";

  list.forEach((item) => {
    new RenderMarkupList().Render(container, item);
  });
}
