// Módulo de validação de formulários
export function initializeFormValidation() {
    console.log('Iniciando validação do formulário...'); // Debug
    
    const form = document.getElementById('cadastro-form');
    if (!form) {
        console.log('Formulário não encontrado!'); // Debug
        return;
    }

    // Garantir que o container de toast existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.setAttribute('role', 'status');
        toastContainer.setAttribute('aria-live', 'polite');
        document.body.appendChild(toastContainer);
    }

    // Objeto com as regras de validação
    const validationRules = {
        nome: {
            pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/,
            message: 'Nome deve conter apenas letras e ter no mínimo 2 caracteres'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email inválido'
        },
        cpf: {
            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            message: 'CPF deve estar no formato 000.000.000-00'
        },
        telefone: {
            pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
            message: 'Telefone deve estar no formato (00) 00000-0000'
        }
    };

    // Função para mostrar mensagem de erro
    function showError(input, message) {
        const errorDiv = input.nextElementSibling?.classList.contains('error-message') 
            ? input.nextElementSibling 
            : document.createElement('div');
        
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e53935';
        errorDiv.style.fontSize = 'var(--fs-sm)';
        errorDiv.style.marginTop = '4px';
        
        input.classList.add('form-error');
        
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    }

    // Função para remover mensagem de erro
    function removeError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv?.classList.contains('error-message')) {
            errorDiv.remove();
        }
        input.classList.remove('form-error');
    }

    // Validação em tempo real dos campos
    form.querySelectorAll('input').forEach(input => {
        const rule = validationRules[input.name];
        if (!rule) return;

        input.addEventListener('input', () => {
            const value = input.value.trim();
            
            if (value && !rule.pattern.test(value)) {
                showError(input, rule.message);
            } else {
                removeError(input);
            }
        });
    });

    // Formatação automática de CPF e telefone
    const cpfInput = form.querySelector('#cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = value;
            }
        });
    }

    const telefoneInput = form.querySelector('#telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            }
        });
    }

    // Validação no envio do formulário
    form.addEventListener('submit', (e) => {
        console.log('Formulário submetido!'); // Debug
        e.preventDefault();
        let isValid = true;
        let firstError = null;
        let emptyFields = [];

        // Validar todos os campos obrigatórios
        form.querySelectorAll('input[required], select[required]').forEach(input => {
            console.log(`Verificando campo: ${input.name}`); // Debug
            const value = input.value.trim();
            
            // Primeiro verifica se o campo está vazio
            if (!value) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                const fieldName = label ? label.textContent.replace(' *', '') : input.name;
                showError(input, `O campo ${fieldName} é obrigatório`);
                emptyFields.push(fieldName);
                isValid = false;
                if (!firstError) firstError = input;
                return;
            }

            // Depois verifica o formato se houver regra de validação
            const rule = validationRules[input.name];
            if (rule && !rule.pattern.test(value)) {
                showError(input, rule.message);
                isValid = false;
                if (!firstError) firstError = input;
            }
        });

        if (!isValid) {
            console.log('Formulário inválido. Campos vazios:', emptyFields); // Debug
            
            // Rola a página até o primeiro campo com erro
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Mostra mensagem detalhada dos campos faltantes
            let message = 'Por favor, preencha os seguintes campos obrigatórios:';
            message += '\n• ' + emptyFields.join('\n• ');
            
            showToast(message, 'error');
            return;
        }

        // Se chegou aqui, o formulário é válido
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Salvar no localStorage como exemplo
        localStorage.setItem('cadastroData', JSON.stringify(data));
        
        // Mostrar mensagem de sucesso
        showToast('Cadastro realizado com sucesso!', 'success');
        
        // Limpar formulário
        form.reset();
    });
}

// Função para mostrar toast de notificação
function showToast(message, type = 'info') {
    console.log('Mostrando toast:', message, type); // Debug
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.style.whiteSpace = 'pre-line'; // Permite quebras de linha no texto
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    
    const container = document.querySelector('.toast-container');
    if (!container) {
        console.error('Toast container não encontrado!');
        return;
    }
    
    // Remove toasts anteriores
    const previousToasts = container.querySelectorAll('.toast');
    previousToasts.forEach(t => t.remove());
    
    container.appendChild(toast);
    
    // Garante que o toast está visível
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 5000); // Aumentado para 5 segundos para dar mais tempo de leitura
}