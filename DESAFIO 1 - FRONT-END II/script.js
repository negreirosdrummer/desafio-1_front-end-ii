const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const email = document.querySelector('#email');
const idade = document.querySelector('#idade');
const form = document.querySelector('#registro');

//Mostra mensagem de erro
const showsError = (input, message) => {
    // Obtem o elemento campo-formulario
    const formField = input.parentElement;
    // Adiciona a class de erro
    formField.classList.remove('success');
    formField.classList.add('error');
    // Mostra a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = message;
};

//Mostra mensagem de sucesso
const showsSuccess = (input) => {
    // Obtem o elemento do campo-formulario
    const formField = input.parentElement;
    // Remove a class de erro
    formField.classList.remove('error');
    formField.classList.add('success');
    // Oculta a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Checa entrada obrigatória
const isRequired = value => value === '' ? false : true;
// Checa tamanho da entrada
const isBetween = (length, min, max) => length < min || length > max ? false : true;
// Checa intervalo de idade
const ageBetween = (value, min, max) => value >= min && value <= max;
// Checa se e-mail é válido
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Valida o campo do nome
const checkName = () => {
    let valid = false;
    const min = 3, max = 50;
    const nomeVal = nome.value.trim();
    if (!isRequired(nomeVal)) {
        showsError(nome, 'Nome não pode ficar em branco.');
    } else if (!isBetween(nomeVal.length, min, max)) {
        showsError(nome, `Nome deve ter entre ${min} e ${max} caracteres.`)
    } else {
        showsSuccess(nome);
        valid = true;
    }
    return valid;
};

// Valida o campo do sobrenome
const checkSurname = () => {
    let valid = false;
    const min = 3, max = 50;
    const sobrenomeVal = sobrenome.value.trim();
    if (!isRequired(sobrenomeVal)) {
        showsError(sobrenome, 'Sobrenome não pode ficar em branco.');
    } else if (!isBetween(sobrenomeVal.length, min, max)) {
        showsError(sobrenome, `Sobrenome deve ter entre ${min} e ${max} caracteres.`)
    } else {
        showsSuccess(sobrenome);
        valid = true;
    }
    return valid;
};

// Valida o campo de e-mail
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
        showsError(email, 'E-mail não pode ficar em branco.');
    } else if (!isEmailValid(emailVal)) {
        showsError(email, 'E-mail inválido.')
    } else {
        showsSuccess(email);
        valid = true;
    }
    return valid;
};

// Valida o campo da idade
const checkAge = () => {
    let valid = false;
    const min = 0, max = 120;
    const idadeVal = idade.value;
    if (!isRequired(idadeVal)) {
        showsError(idade, 'Idade não pode ficar em branco.');
    } else if (!ageBetween(idadeVal, min, max)) {
        showsError(idade, `Insira uma idade entre ${min} e ${max} anos.`)
    } else {
        showsSuccess(idade);
        valid = true;
    }
    return valid;
};

function enviarDados() {
    window.location.href = "index.html";
}

function voltarParaForm() {
    window.location.href = "form.html";
}

// Modifica o manipulador de eventos de envio
form.addEventListener('submit', (e) => {
    // Previne a submissão do formulário
    e.preventDefault();
    const isNameValid = checkName();
    const isSurnameValid = checkSurname();
    const isEmailValid = checkEmail();
    const isAgeValid = checkAge();

    // Submete o formulário, se válido
    if (isNameValid &&
        isSurnameValid &&
        isEmailValid &&
        isAgeValid) {

        const fd = new FormData(form);
        const obj = Object.fromEntries(fd);
        const json = JSON.stringify(obj);

        localStorage.setItem('form', json);

        //TODO: Adicionar envio de formulário
        window.location.href = "./confirmation.html";
    }
});
