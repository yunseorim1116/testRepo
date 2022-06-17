import React from "react";

export interface Iresponse {
  response: Idocs;
}
export interface Idocs {
  docs: InewsSearch[];
}

export interface newsInfo { //보낼 데이터 타입
  id: string;
  name: string;
  title: string;
  date: string;
  content: string;
  clip: boolean;
  url: string;
}



export interface InewsSearch {//api로 을 데이터 타입
  id: string;
  clip?: boolean;
  _id: string;
  uri: string;
  web_url: string;
  lead_paragraph: string;
  pub_date: string;

  byline: { original: string };
  headline: { main: string };
}
