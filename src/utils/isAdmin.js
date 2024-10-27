const listOfAdmins = [
    'test@gmail.com',
    'admin@geekcms.com',
    'dcoder.sm@gmail.com'
]

export default async function isAdmin(session){
    if(!session) return false;
    let emailMatch = listOfAdmins.map(each => each.toLowerCase().trim().includes(session.user.email.toLowerCase().trim()))
    if(session.user.role == 'admin' || (session.user?.email && emailMatch)){
        return true;
    }
    return false;
}