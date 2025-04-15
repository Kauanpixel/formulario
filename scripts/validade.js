document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inscricaoForm');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Previne envio até validar tudo
  
      let isValid = true;
      const camposObrigatorios = form.querySelectorAll('[required]');
      limparMensagensErro();
  
      camposObrigatorios.forEach((campo) => {
        if (!campo.value.trim()) {
          mostrarErro(campo, 'Este campo é obrigatório');
          isValid = false;
        } else {
          if (campo.name === 'email' && !validarEmail(campo.value)) {
            mostrarErro(campo, 'E-mail inválido');
            isValid = false;
          }
  
          if (campo.name === 'nascimento' && !validarData(campo.value)) {
            mostrarErro(campo, 'Data de nascimento inválida');
            isValid = false;
          }
  
          if (campo.name === 'cpf' && !validarCPF(campo.value)) {
            mostrarErro(campo, 'CPF inválido');
            isValid = false;
          }
        }
      });
  
      if (isValid) {
        alert('Inscrição realizada com sucesso!');
        form.reset();
        localStorage.removeItem('dadosFormulario'); // limpa os dados salvos, se desejar
      }
    });
  
    function mostrarErro(campo, mensagem) {
      campo.classList.add('erro');
  
      const span = document.createElement('span');
      span.className = 'mensagem-erro';
      span.textContent = mensagem;
  
      if (campo.parentNode) {
        campo.parentNode.appendChild(span);
      }
    }
  
    function limparMensagensErro() {
      form.querySelectorAll('.mensagem-erro').forEach((el) => el.remove());
      form.querySelectorAll('.erro').forEach((el) => el.classList.remove('erro'));
    }
  
    function validarEmail(email) {
      // Regex simples para validar e-mails
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validarData(data) {
      return !isNaN(Date.parse(data));
    }
  
    function validarCPF(cpf) {
      // Validação simplificada apenas para formato
      return /^\d{11}$/.test(cpf.replace(/\D/g, ''));
    }
  });

  const salvarBtn = document.getElementById('salvarBtn');
salvarBtn.addEventListener('click', function () {
  const dados = new FormData(form);
  const dadosObj = {};

  for (let [chave, valor] of dados.entries()) {
    dadosObj[chave] = valor;
  }

  localStorage.setItem('dadosFormulario', JSON.stringify(dadosObj));
  alert('Dados salvos temporariamente!');
});