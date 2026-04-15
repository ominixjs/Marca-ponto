const btnDropdown = document.getElementById("btn_dropdown");
const dropdown = document.getElementById("dropdown");

if (btnDropdown) {
    btnDropdown.addEventListener("click", () => {
        if (dropdown.classList.contains("open")) {
            dropdown.classList.remove("open");
            return;
        }
        dropdown.classList.add("open");
    });
}
