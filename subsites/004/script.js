document.querySelectorAll('.nav-bar a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Previne o comportamento padrão do link
      const targetId = this.getAttribute('href').substring(1); // Obtém o ID sem o #
      const targetSection = document.getElementById(targetId); // Encontra a seção correspondente
      const offset = 48; // Ajuste para 3rem (48px)
  
      // Calcula a posição ajustada
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
  
      // Faz o scroll suave para a posição ajustada
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
  