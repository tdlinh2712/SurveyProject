const sendGrid = require('@sendgrid/mail');
const keys = require('../config/keys');

sendGrid.setApiKey(keys.sendGridKey);

class Mailer {
    //constructor: any object that has subject & recipients + a string
    constructor({subject, recipients}, content) {
        this.recipients = recipients.map(({email}) => email);
        this.isMultiple = true;

        if(this.recipients.length === 1) {
            this.recipients = this.recipients[0];
            this.isMultiple = false;
        }

        this.emails = {
            to: this.recipients,
            from: 'tdlinh2712@gmail.com',
            subject: subject,
            html: content,

            tracking_settings: {
                click_tracking: {
                    enable: true,
                    enable_text: true,
                },
            },

            isMultiple: this.isMultiple,
        };
    };

    async send() {
        try {
            if(!this.recipients.length) {
                return null;
            }

            return await sendGrid.send(this.emails);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            return null;
        }
    }
}

module.exports = Mailer;