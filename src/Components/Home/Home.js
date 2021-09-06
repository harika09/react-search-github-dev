import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "../Card/Card";
import { BeatLoader } from "react-spinners";

function Home() {
  const [userData, setUserData] = useState([]);
  const [inputUser, setInputUser] = useState("");
  const [click, setClick] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Light");
  const showProfile = () => setClick(!click);
  const enableDarkMode = () => setDarkMode(!darkMode);

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputUser !== "") {
      axios
        .get(`https://api.github.com/users/${inputUser}`)
        .then((response) => {
          setUserData(response.data);
          showProfile(); /* Set showProfile to true */
          setClick(true);
          setInputUser("");
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No Developer Found",
          });
          setInputUser("");
          setUserData("");
          setClick(false);
        });
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Developer Found",
      });
      setInputUser("");
    }
  };

  const dark = () => {
    if (darkMode) {
      document.body.style.backgroundColor = "#1d1c29";
      setButtonLabel("Light");
      localStorage.setItem("Mode", "Dark");
    } else {
      document.body.style.backgroundColor = "#fff";
      setButtonLabel("Dark");
      localStorage.clear();
    }
  };

  useEffect(() => {
    const Mode = localStorage.getItem("Mode");

    if (Mode) {
      setDarkMode(false);
      document.body.style.backgroundColor = "#1d1c29";
      setButtonLabel("Light");
    } else {
      document.body.style.backgroundColor = "#fff";
      setDarkMode(true);
      setButtonLabel("Dark");
    }
  }, []);

  return (
    <div
      className={
        darkMode ? "user-profile-container active" : "user-profile-container"
      }
    >
      <div className="user-profile-content bd-container">
        <div className="top-content">
          <div>
            <strong>DevFinder</strong>
          </div>

          <div>
            <button
              onClick={() => {
                enableDarkMode();
                dark();
              }}
            >
              {buttonLabel}
            </button>
            <i className="fas fa-adjust"></i>
          </div>
        </div>

        <div className="user-profile-input">
          <div className="form-input">
            <i className="fas fa-search"></i>
            <form onSubmit={searchUser}>
              <input
                type="text"
                id="users"
                placeholder="Search GitHub username..."
                value={inputUser}
                onChange={(e) => {
                  setInputUser(e.target.value);
                }}
                autoComplete="off"
              />
            </form>

            <input type="submit" onClick={searchUser} value="Search" />
          </div>
        </div>

        {isloading ? (
          <div className="loading">
            <BeatLoader loading color="#e98580" />
          </div>
        ) : (
          <div className={click ? "user-profile active" : "user-profile"}>
            <Card userData={userData} />
          </div>
        )}

        {/* <div className={click ? "user-profile active" : "user-profile"}>
          <Card userData={userData} />
        </div> */}
      </div>
    </div>
  );
}

export default Home;
