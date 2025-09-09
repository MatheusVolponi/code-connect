const uploadBtn = document.getElementById("upload-btn");
const uploadImg = document.getElementById("upload-img");

uploadBtn.addEventListener("click", () => {
    uploadImg.click();
});

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({url: reader.result, name: file.name});
        }
        reader.onerror = () => {
            reject(`Erro na leitura do arquivo ${file.name}`);
        }

        reader.readAsDataURL(file);
    });
}

const mainImg = document.querySelector(".main-img");
const imgName = document.querySelector(".container-img-name p")

uploadImg.addEventListener("change", async (e) => {
    const file = e.target.files[0];

    if (e) {
        try {
            const fileContent = await readFile(file);
            mainImg.src = fileContent.url;
            imgName.textContent = fileContent.name;
        } catch (error) {
            console.error("Erro na leitura do arquivo.");
        }
    }
})

const inputCategory = document.getElementById("category");
const tagsList = document.getElementById("tags-list");

inputCategory.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const textTag = inputCategory.value.trim();
        if (textTag !=="") {
            const newTag = document.createElement("li");
            newTag.innerHTML = `<p>${textTag}</p> <img src="./img/close-black.svg" class="remove-tag">`
            tagsList.appendChild(newTag);
            inputCategory.value = "";
        }
    }
})

tagsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-tag")) {
        const tagToRemove = e.target.parentElement;
        tagsList.removeChild(tagToRemove);
    }
})

const availableTags = ["Front-End", "Back-End", "Full-Stack", "Data-Science", "Programação", "Mobile"];

async function fetchTags(tagText) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(availableTags.includes(tagText));
        }, 1000)
    })
}