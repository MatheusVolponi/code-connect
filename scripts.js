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

    if(e) {
        try {
            const fileContent = await readFile(file);
            mainImg.src = fileContent.url;
            imgName.textContent = fileContent.name;
        } catch (error) {
            console.error("Erro na leitura do arquivo.");
        }
    }
})