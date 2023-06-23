import * as SendGrid from '@sendgrid/mail';

export async function sendCreatePasswordEmail(user, token): Promise<any> {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const sendgrid_body: any = {
        to: user.email,
        from: process.env.SENDGRID_FROM,
        template_id: process.env.FORM_PREBOARDING_TEMPLATE_ID,
        dynamic_template_data: {
            form_url: `${process.env.FORM_URL_CREATE_PASS}?token=${token}`,
            user_name: user.first_name,
            company_name: user.company.name
        },
    };

    SendGrid
        .send(sendgrid_body)
        .then(() => {
            console.log('Email Enviado!')
        })
        .catch((error) => {
            console.error(error.message)
        });
};

export async function sendResetPassEmail(user, token): Promise<any> {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

    const sendgrid_body: any = {
        to: user.email,
        from: process.env.SENDGRID_FROM,
        template_id: process.env.RESET_PASS_TEMPLATE_ID,
        dynamic_template_data: {
            form_url: `${process.env.FORM_URL_RESET_PASS}?token=${token}`,
            user_name: user.first_name,
            company_name:  user.company.name
        },
    };

    SendGrid
        .send(sendgrid_body)
        .then(() => {
            console.log('Email Enviado!')
        })
        .catch((error) => {
            console.error(error.message)
        });
};