export const inLogged = () => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");
    if (!token || !expiry) return false;
    if (Date.now() > Number(expiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        navigate("/login");
    }
    return true;
}