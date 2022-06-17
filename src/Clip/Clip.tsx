import React, { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { clipNews, unclipNews } from "../reducer/userClipSlice";
import { useNavigate } from "react-router-dom";
import { newsInfo } from "../Type/data";
import { RootState } from "..";

function Clip() {
  let dispatch = useDispatch();

  const navigate = useNavigate();


  const clippedNews = useSelector((state: RootState) => state.userClipSlice.content); // 클립된 뉴스 불러오기

  return (
    <>
      <button
        className="mainLink"
        onClick={() => {
          navigate("/");
        }}
      >
        메인으로
      </button>
      {/* 클립 뉴스 맵핑해서 보여주기 */}
      {clippedNews.map((i: newsInfo, key: number) => {
        console.log(i);
        console.log(key);
        if (key > 0) {
          return (
            <article style={{ marginBottom: "40px" }}>
              <div className="newsTitle">
                <h3>{i.title}</h3>
              </div>
              <div className="writeDate">{i.date}</div>
              <div className="newsContents">{i.content}</div>
              {/* 클립이 false일 때 clip으로 보여지고, true이면 unclip으로 보여주기 */}
              {i.clip == false ? (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(unclipNews(i.id));
                  }}
                >
                  Clip
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(unclipNews(i.id));
                  }}
                >
                  Unclip
                </button>
              )}
              <button type="button">
                <a href={i.url} target="_blank" rel="noreferrer">
                  See Detail
                </a>
              </button>
            </article>
          );
        }
      })}
    </>
  );
}

export default Clip;
