export {
    isEmailAddress
}
const isEmailAddress = (text) => {
    return (text.match( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) ? true : false;
}