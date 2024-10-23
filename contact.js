document.getElementById('navToggle').addEventListener('click', function () {
    const navPopup = document.getElementById('navPopup');
    navPopup.classList.toggle('active');
});


document.getElementById("navToggle").addEventListener("click", function () {
    const popupMenu = document.getElementById("popupMenu");
    if (popupMenu.style.display === "none" || popupMenu.style.display === "") {
        popupMenu.style.display = "block";
    } else {
        popupMenu.style.display = "none";
    }
});
