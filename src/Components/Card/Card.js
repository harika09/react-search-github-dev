import React from "react";
import moment from "moment";
import "./Card.css";

function Card({ userData }) {
  const {
    login,
    name,
    avatar_url,
    public_repos,
    followers,
    following,
    location,
    html_url,
    twitter_username,
    bio,
    created_at,
  } = userData;

  const noBio = "This profile has no bio";
  const notAvailable = "Not Available";

  const twitter = () => {
    if (twitter_username === null) {
      return [<span>{notAvailable}</span>];
    } else {
      return [<span>{twitter_username}</span>];
    }
  };

  const userlocation = () => {
    if (location === null) {
      return [<span>{notAvailable}</span>];
    } else {
      return [<span>{location}</span>];
    }
  };

  return (
    <div className="user-profile-data">
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile">
            <div className="profile-image">
              <img src={avatar_url} alt={login} />
            </div>
            <div className="user-info">
              <div>
                <h3>{login}</h3>
                <span>
                  <a href={html_url}>{name}</a>
                </span>

                {bio === "null" ? <p>{bio}</p> : <p>{noBio}</p>}
              </div>
              <span>{moment(created_at).add(1, "year").format("LL")}</span>
            </div>
          </div>
        </div>

        <div className="user-github-info">
          <div>
            <span>Repos</span>
            <strong>{public_repos}</strong>
          </div>

          <div>
            <span>Followers</span>
            <strong>{followers}</strong>
          </div>

          <div>
            <span>Following</span>
            <strong>{following}</strong>
          </div>
        </div>

        <div className="user-other-info">
          <div>
            <i className="fas fa-map-marker-alt"></i>
            {userlocation()}
          </div>

          <div>
            <i className="fab fa-twitter"></i>
            {twitter()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
