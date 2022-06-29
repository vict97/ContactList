//Variable de recuperation
const p = document.querySelector('p'); //paragraphe pour deposer la photo
let file; //this is a global variable and we'll use it inside multiple functions
const dropArea = document.querySelector(".drag-area"); //l'image
let displayContent = document.querySelector(".displayContent") // contenu à afficher
let listContact = document.querySelector(".listContact");
let form = document.querySelector("form")



//buttons
let submitCreer = document.querySelector('.submit-creer')
let submitReinit = document.querySelector(".submitReinit");

var img = '';
var count = 0;


/***** RECUPERATION DE L'IMAGE DEPUIS FORMULAIRE HTML */
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    // dragText.textContent = "Release to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            img = fileURL;
            // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
            let imgTag = `<img src="${fileURL}" alt="image" id="img">`; //creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        // dragText.textContent = "Drag & Drop to Upload File";
    }
}

// button SubmitAdd
submitCreer.addEventListener('click', (e) => {
    e.preventDefault();
    let prenom = document.querySelector("#prenom").value
    let nom = document.querySelector("#nom").value
    let group = document.querySelector("#group").value
    let phone = document.querySelector("#phone2").value
    let bio = document.querySelector("#bioText").value
    let mail = document.querySelector("#mail").value

    //Verification suppression ou modification
    let hidden = document.querySelector("#index")
    console.log(hidden)


    if (hidden.value == '-1') {
        if (
            prenom == "" || nom == "" || group == "" || phone == "" || bio == "" || mail == "") {
            alert('Champs obligatoires')
        } else {

            let showMessage = document.querySelector(".showMessage")
            showMessage.style.backgroud = "white"
            let display = `
            <div class="displayContent" id="contact_${count}">
                <div class="displayImg"> 
                  <img src="${img}" id="contact_img_${count}"/>
                </div>
                    <div class="showContent">
                        <span class="icons">
                            <i class="fas fa-user-edit btn_modifier" data-index=${count}></i>
                            <i class="fa fa-trash btn_delete" aria-hidden="true" id="contact_edit_btn_${count}" data-index=${count}></i>
                        </span>
                        <span id="png">
                            <span id="idPrenom_${count}">${prenom}</span>  
                            <span id="idNom_${count}">${nom}</span> 
                            <span id="idGroup_${count}">${group}</span>
                        </span>
                        <p id="idMail_${count}">${mail}</p>
                        <p id="phone_${count}">${phone}</p>
                        <p id="bio_${count}">${bio}</p>
                    </div>
            </div>
              `

            listContact.innerHTML += display;
            count++;

            document.querySelector("form").reset();
            let imgE = document.querySelector("#img");
            imgE.src = ''



            //suppression
            let btnDeletes = document.querySelectorAll(".btn_delete");
            btnDeletes.forEach(btndel => {
                btndel.addEventListener('click', (e) => {
                    // let parent = displayContent.parentNode;
                    let id = e.target.dataset.index;
                    let contact = document.querySelector(`#contact_${id}`);
                    //console.log(contact)
                    listContact.removeChild(contact)
                })
            })

            //Modifier
            let btnModifier = document.querySelectorAll(".btn_modifier");
            btnModifier.forEach(btnmod => {
                btnmod.addEventListener('click', (e) => {
                    let index = e.target.dataset.index;
                    let imgArea = document.querySelector("#img");
                    let imgEdt = document.querySelector(`#contact_img_${index}`)
                    imgArea.src = imgEdt.src

                    let prenom = document.querySelector("#prenom")
                    let nom = document.querySelector("#nom")
                    let group = document.querySelector("#group")
                    let phone = document.querySelector("#phone2")
                    let bio = document.querySelector(`#bio_${index}`)
                    let mail = document.querySelector("#mail")
                    let index_input = document.querySelector("#index")

                    //recuperation de valeurs à modifier
                    index_input.value = index;

                    let contactPrenom = document.querySelector(`#idPrenom_${index}`)
                    prenom.value = contactPrenom.textContent

                    let contactNom = document.querySelector(`#idNom_${index}`)
                    nom.value = contactNom.textContent

                    let contactGroup = document.querySelector(`#idGroup_${index}`)
                    group.value = contactGroup.textContent

                    let phoneContact = document.querySelector(`#phone_${index}`)
                    phone.value = phoneContact.textContent

                    let bioContact = document.querySelector(`#bioText`)
                    bioContact.value = bio.textContent

                    let mainContact = document.querySelector(`#idMail_${index}`)
                    mail.value = mainContact.textContent;


                })
            })


        }
    } else {

        // Modification des entrées du formulaire
        let hidden = document.querySelector("#index")
        let index = hidden.value;

        let prenom = document.querySelector("#prenom")
        let nom = document.querySelector("#nom")
        let group = document.querySelector("#group")
        let phone = document.querySelector("#phone2")
        let bio = document.querySelector(`#bio_${index}`)
        let mail = document.querySelector("#mail")
        let imgArea = document.querySelector('#imgArea');
        let index_input = document.querySelector("#index")

        let contactPrenom = document.querySelector(`#idPrenom_${index}`)
        let contactNom = document.querySelector(`#idNom_${index}`)
        let contactGroup = document.querySelector(`#idGroup_${index}`)
        let phoneContact = document.querySelector(`#phone_${index}`)
        let bioContact = document.querySelector(`#bioText`)
        let mailContact = document.querySelector(`#idMail_${index}`)
        let contactImg = document.querySelector(`#contact_img_${index}`)

        contactPrenom.innerHTML = prenom.value;
        contactNom.innerHTML = nom.value;
        contactGroup.innerHTML = group.value;
        phoneContact.innerHTML = phone.value;
        bioContact.innerHTML = bio.value;
        mailContact.innerHTML = mail.value;
        contactImg.src = imgArea.src

        // vider le formulaire de modification
        document.querySelector("form").reset();
        let img = document.querySelector("#img");
        img.src = ''
        hidden.value = '-1'


    }

})

//fonction modifier
function textModif(prenom, nom, phone, group, bio, img) {
    return `
    <div class="displayContent" id="contact_${count}">
        <div class="displayImg"> 
          <img src="${img}"/>
        </div>
            <div class="showContent">
                <span class="icons">
                    <i class="fas fa-user-edit btn_modifier" data-index=${count}></i>
                    <i class="fa fa-trash btn_delete" aria-hidden="true" id="contact_edit_btn_${count}" data-index=${count}></i>
                </span>
                <span id="png">
                ${prenom} ${nom} ${group}
                </span>
                <p id="phone">${phone}</p>
                <p id="bio">${bio}</p>
            </div>
    </div>
      `
}

//Reunitialisation formulaire
submitReinit.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector("form").reset();
    let img = document.querySelector("#img");
    img.src = ''
    let hidden = document.querySelector("#index")
    hidden.value = '-1'
})