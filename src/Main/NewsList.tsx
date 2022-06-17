import { useDispatch } from "react-redux";
import { clipNews, unclipNews } from "../reducer/userClipSlice";
import { InewsSearch } from "../Type/data";
import { newsInfo } from "../Type/data";

interface Iprops {
  clip: boolean;
  newscontent: InewsSearch;
}

function NewsList(props: Iprops) {
  //   console.log(typeof props.clip);
  console.log(props)

  // props를 가져와서 info로 관리
  let newsInfo: newsInfo = {
    id: props.newscontent._id, //
    name: props.newscontent.byline.original,
    title: props.newscontent.headline.main,
    date: props.newscontent.pub_date,
    content: props.newscontent.lead_paragraph,
    clip: props.clip,
    url: props.newscontent.web_url,
  };

  const dispatch = useDispatch();
  function clipClick() {
    if (newsInfo.clip === true) {
      // unClip Function
      dispatch(unclipNews(newsInfo));
    } else {
      // clip Function
      dispatch(clipNews(newsInfo));
    }
  }

  return (
    <>
      <article style={{ marginBottom: "40px" }}>
        <div className="newsTitle">
          <h3>{newsInfo.title}</h3>
        </div>
        <div className="writeDate">{newsInfo.date}</div>
        <div className="newsContents">{newsInfo.content}</div>
        <button type="button" onClick={clipClick}>
          {newsInfo.clip === true ? "UnClip" : "Clip"}
        </button>
        <button type="button">
          <a href={newsInfo.url} target="_blank" rel="noreferrer">
            See Detail
          </a>
        </button>
      </article>
    </>
  );
}

export default NewsList;
