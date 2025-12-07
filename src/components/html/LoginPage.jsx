import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    place: "",
    role: "",
  });

  const navigate = useNavigate();

  const switchMode = () => {
    setIsLogin(!isLogin);
    setForm({
      name: "",
      email: "",
      password: "",
      phone_no: "",
      place: "",
      role: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const url = isLogin
    //   ? "http://localhost:5000/api/auth/login"
    //   : "http://localhost:5000/api/auth/register";

    const url = isLogin
  ? `${process.env.REACT_APP_API_URL}/api/auth/login`
  : `${process.env.REACT_APP_API_URL}/api/auth/register`;


    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      // console.log("FORM SENT:", form);

      if (!res.ok) {
        // alert(data.message || "Something went wrong");
        return;
      }

      // alert(isLogin ? "Login successful" : "Registration successful");

      if (!isLogin) {
        setIsLogin(true);
        navigate("/login");
        return;
      }

      const role = data.user?.role;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userRole", role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user?.id);

      if (role === "admin") navigate("/admin");
      else navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone_no}
              onChange={(e) => setForm({ ...form, phone_no: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Place"
              value={form.place}
              onChange={(e) => setForm({ ...form, place: e.target.value })}
              required
            />

            <div className="role-section">
              <label className="role-title">Select Role</label>

              <div className="role-group">
                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    checked={form.role === "donor"}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                    required
                  />
                  Donor
                </label>

                <label className="role-option">
                  <input
                    type="radio"
                    name="role"
                    value="ngo"
                    checked={form.role === "ngo"}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                  />
                  NGO
                </label>
              </div>
            </div>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit">{isLogin ? "Login" : "Register"}</button>

        <p onClick={switchMode}>
          {isLogin
            ? "Don’t have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
