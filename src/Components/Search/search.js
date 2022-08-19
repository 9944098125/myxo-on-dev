import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import "./search.css";
import search from "../../Assets/Images/search.png";

function Search() {
  //Redux State:
  const sidePanel = useSelector((state) => state.sidePanel);

  return (
    <Fragment>
      {/* page wrapper*/}
      <div
        className={`page-wrapper ${
          sidePanel.toggle ? "sideClose" : "sideOpen"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <button className="btn secondary-button mx-2">
                Top trainers
              </button>
              <button className="btn secondary-button mx-2">
                Recently added
              </button>
              <button className="btn secondary-button mx-2">Videos</button>
              <button className="btn secondary-button mx-2">Lorem Ipsum</button>
            </div>
          </div>

          <div className="row">
            <div className="col borders mx-4 mt-4">
              <span className="t-1">CATEGORIES</span>
            </div>
            <div className="col text-end mx-4 mt-4">
              <span>Sort by</span>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <div className="row">
                <div className="col borders mx-4 mt-4">
                  <span>Hit classes</span>
                </div>
              </div>
              <div className="mx-4" style={{fontSize:"14px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </div>
            </div>

            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px" />
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
          </div>


          <div className="row mb-3">
            <div className="col">
              <div className="row">
                <div className="col borders mx-4 mt-4">
                  <span>Hit classes</span>
                </div>
              </div>
              <div className="mx-4" style={{fontSize:"14px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </div>
            </div>

            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
          </div>


          <div className="row mb-3">
            <div className="col">
              <div className="row">
                <div className="col borders mx-4 mt-4">
                  <span>Hit classes</span>
                </div>
              </div>
              <div className="mx-4" style={{fontSize:"14px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </div>
            </div>

            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
          </div>


          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col borders mx-4 mt-4">
                  <span>Hit classes</span>
                </div>
              </div>
              <div className="mx-4" style={{fontSize:"14px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
              </div>
            </div>

            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
            <div className="col">
              <img src={search} alt="search" width="200px"/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Search;
