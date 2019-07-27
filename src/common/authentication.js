class Authentication {
    static checkUser() {
        return sessionStorage.getItem('sessionId') != null;
    }

    static setUser(sessionId) {
        sessionStorage.setItem('sessionId', sessionId);
    }
    static async logout(){
        let sessionId = sessionStorage.getItem('sessionId');
        if(sessionId){
            const response = await fetch(`http://localhost:8090/Logout?sessionId=${sessionId}`, {
                method: 'GET'
            });
            if (response.ok) {
                sessionStorage.removeItem('sessionId');
            }
            else {
                alert('logout failed!');
            }
        }
    }
}

export default Authentication