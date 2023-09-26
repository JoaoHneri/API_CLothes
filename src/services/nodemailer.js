const nodemailer = require('nodemailer');
require('dotenv').config()

const enviarEmail = (email, name)=>{
    const transporter = nodemailer.createTransport({
        service: 'smtp',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
    
    
    
        const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        html:`<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bem-vindo à Nossa Loja de Roupas</title>
        </head>
        <body>
            <table style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                <tr>
                    <td style="text-align: center; background-color: #f7f7f7; padding: 10px;">
                        <img src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2f2020%2f12%2f12%2f09%2fLogo-272799_34049_091615787_599428780.jpg" alt="Logo da Loja" style="max-width: 100%;">
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; padding: 20px;">
                        <h1>Bem-vindo(a) à Nossa Loja de Roupas, ${name}!</h1>
                        <p>Ficamos felizes em tê-lo(a) cadastrado(a) em nossa plataforma.</p>
                        <p>Desfrute do nosso catálogo de roupas e sinta-se à vontade para entrar em contato conosco ou com o suporte caso precise de ajuda.</p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; background-color: #f7f7f7; padding: 10px;">
                        <p>&copy; 2023 CLothes</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
        subject: 'Dados Recebidos',
        text: `Olá ${name}, ficamos felizes em termos você cadastrado em nossa plataforma, desfrute de nosso catálogo e sinta-se a vontade para entrar em contato conosco ou com o suporte!`,
        
      };
    
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Erro ao enviar o e-mail:', error);
          console.log('Erro ao enviar o e-mail' );
        } else {
          console.log('E-mail enviado com sucesso:');
          console.log('Dados recebidos e e-mail enviado com sucesso' );
        }
      });
}

module.exports = enviarEmail







