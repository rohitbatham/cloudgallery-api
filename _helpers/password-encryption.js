import bcrypt from "bcryptjs";


export async function EncryptPassword(password){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return { hashedPassword: hashedPassword} ;
}

export async function ComparePassword(userPassword, dbHash){
    const pwdMaches = await bcrypt.compare(userPassword, dbHash);
    return { pwdMaches : pwdMaches}
}