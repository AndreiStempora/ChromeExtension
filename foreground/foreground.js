const regex = /^[A-Z0-9]{17}$/;

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("novo-link")) return;
    if (regex.test(event.target.innerText)) {
        const anchor = document.createElement("a");
        anchor.href = "https://www.steamgifts.com/giveaway/" + event.target.innerText;
        anchor.target = "_blank";
        anchor.innerText = event.target.innerText;
        anchor.classList.add("novo-link");
        event.target.innerText = "";
        event.target.appendChild(anchor);
    }

    
});