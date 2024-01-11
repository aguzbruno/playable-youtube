import "./Topics.css";

export default function Topics({ image, text, borderBottom }) {
  return (
    <div className={`topic-container ${borderBottom ? "border-bottom" : ""}`}>
      <div className="topic-image-text">
        <div className="image-topic">
          <img src={image} alt={"img"}></img>
        </div>
        <p className="topic-text">{text}</p>
      </div>
    </div>
  );
}
