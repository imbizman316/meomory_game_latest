export default function Card ({id, image, name, randomCards, pickFace, isPicked}) {
  
  function sort(id) {
   
    pickFace(id)

  }
  let classTitle = "";
  isPicked ? classTitle = "card" : classTitle = "card";

  return (
    <div className={classTitle} onClick={(e)=>{sort(id)}}>
      <img className="image" src={image} alt={name}></img>
      <p>{name}</p>
    </div>
  )

}