import style from "./Card.module.scss";

export const Card = (props) => {
  //console.log("props", props);
  return (
    <div className={style.card}>
      <figure>
        <img src={props.image} alt={props.title} />
        <figcaption>Scene: {props.stage}</figcaption>
      </figure>
      <h3>{props.title}</h3>
      {/* <p>{props.description}</p> */}
    </div>
  );
};
