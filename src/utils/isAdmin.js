const listOfAdmins = [
    'test@gmail.com',
    'admin@geekcms.com',
    'dcoder.sm@gmail.com'
]

export default async function isAdmin(session){
    if(!session) return false;
    let userEmail = session.user.email.toLowerCase().trim();

    let emailMatch = listOfAdmins.some(singleEmail => {
        return singleEmail.toLowerCase().trim() === userEmail
    })
    console.log(emailMatch, ' email match')
    if(session.user.role == 'admin' || (session.user?.email && emailMatch)){
        return true;
    }
    return false;
}