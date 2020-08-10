
const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
    const invalidEmails = emails.split(",")
        .map(email => email.trim())
        .filter(email => email && !regex.test(email)); //invalid => return true so that invalid emails are kept inside filter
    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;

};