const sessionIdKey = 'sessionId';
const userNameKey = 'userName';
class Authentication {
    static checkUser() {
        return sessionStorage.getItem(sessionIdKey) != null;
    }

    static setUser(sessionId, name) {
        sessionStorage.setItem(sessionIdKey, sessionId);
        sessionStorage.setItem(userNameKey, name);
    }
    static async logout(){
        let sessionId = sessionStorage.getItem(sessionIdKey);
        if(sessionId){
            const response = await fetch(`http://localhost:8090/Logout?sessionId=${sessionId}`, {
                method: 'GET'
            });
            if (response.ok) {
                sessionStorage.removeItem(sessionIdKey);
                sessionStorage.removeItem(userNameKey);
            }
            else {
                alert('logout failed!');
            }
        }
    }

    static getUserName() {
        return sessionStorage.getItem(userNameKey)
    }

    static getSessionId() {
        return sessionStorage.getItem(sessionIdKey);
    }
}

export default Authentication