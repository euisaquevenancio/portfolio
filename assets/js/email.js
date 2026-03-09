emailjs.init("2Lo8ubEzSCIh09h4h");

const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const textareaMessage = document.getElementById("textareaMessage");
const formButton = document.querySelector("button");

formButton.addEventListener("click", function (event) {
    event.preventDefault();
    validateForm();
});

document.addEventListener("keydown", function(e) {
    if ((document.activeElement == inputName || document.activeElement == inputEmail || document.activeElement == textareaMessage) && e.key == "Enter") {
        validateForm();
    }
});

// Valida os campos do formulário de contato
function validateForm() {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const message = textareaMessage.value.trim();
    let valid = true;

    // Validação nome
    if (name.length < 3 || name.length > 100 || name === "") {
        document.getElementById("nameHelp").style.display = "block";
        valid = false;
    } else {
        document.getElementById("nameHelp").style.display = "none";
    }

    // Validação email
    if (!inputEmail.checkValidity() || email === "") {
        document.getElementById("emailHelp").style.display = "block";
        valid = false;
    } else {
        document.getElementById("emailHelp").style.display = "none";
    }

    // Validação mensagem
    if (message.length < 10 || message.length > 5000 || message === "") {
        document.getElementById("messageHelp").style.display = "block";
        valid = false;
    } else {
        document.getElementById("messageHelp").style.display = "none";
    }

    if (!valid) {
        return;
    }

    // Envia o email se os campos forem válidos
    sendEmail(name, email, message);
}

// Envia o email utilizando o EmailJS
function sendEmail(name, email, message) {
    formButton.disabled = true;

    if (storagedLanguage == "pt-br") { 
        document.querySelector("button span").innerText = "Enviando...";
    } else {
        document.querySelector("button span").innerText = "Sending...";
    }

    emailjs.send("service_sftzmoh", "template_ayft1to", {
        name: name,
        email: email,
        message: message,
        time: new Date().toLocaleString("pt-BR")
    })
    .then(() => {
        if (storagedLanguage == "pt-br") {
            Swal.fire({
                title: "Mensagem enviada!",
                text: "Muito obrigado pelo contato! Responderei sua mensagem assim que possível.",
                icon: "success",
                theme: storagedTheme
            });
        } else {
            Swal.fire({
                title: "Message sent!",
                text: "Thank you very much for reaching out! I will respond to your message as soon as possible.",
                icon: "success",
                theme: storagedTheme
            });
        }
    })
    .catch((error) => {
        console.error(error);

        if (storagedLanguage == "pt-br") {
            Swal.fire({
                title: "Erro ao enviar mensagem!",
                text: "Ocorreu um problema e não foi possível enviar sua mensagem. Tente novamente mais tarde.",
                icon: "error",
                theme: storagedTheme
            });
        } else {
            Swal.fire({
                title: "Error sending message!",
                text: "There was a problem and your message could not be sent. Please try again later.",
                icon: "error",
                theme: storagedTheme
            });
        }
    })
    .finally(() => {
        formButton.disabled = false;

        if (storagedLanguage == "pt-br") { 
            document.querySelector("button span").innerText = "Enviar mensagem";
        } else {
            document.querySelector("button span").innerText = "Send message";
        }
    });
}