import React from 'react';
import Data from './Data';
import Card from './Card';
import { nanoid, random } from 'nanoid';
import axios from 'axios';

export default function Main(){
 
  const [randomCards, setRandomCards] = React.useState([]);
  const [pickedCount, setPickedCount] = React.useState(0);
  const [isClear, setClear] = React.useState(false);
  const [highScore, setHighScore] = React.useState(JSON.parse(localStorage.getItem("Highscore")) || 0);

  const [url, setURL] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("")

  //-------------Fetch girls data from local server---------------
  const axiosFetchData = async(processing) => {

    await axios.get('http://localhost:4000/users')
    .then ( res => {
      if (processing) {
        console.log(res.data)
        setRandomCards(res.data)
      }
    })
    .catch(err => console.log(err))    
  } 

  const axiosPostData = async() => {

    const postData = {
      id: randomCards.length + 1,
      imageURL: url,
      name: name,
      isPicked: false,
    }

    await axios.post('http://localhost:4000/contact', postData)
    .then(res => setMessage(<p className='success'>{res.data}</p>))
    
  }

  

  //-------------Fetch girls data from local server---------------  


  const RandomizeCards = () => {

    //--------------------------------------------------------//    

    //--------------------------------------------------------//
    
    let count = randomCards.length;
    let box = [];

    for (let i = 0; i < count; i++) {
      box.push(i);
    }
    
    let newCards = [];

    for (let i=0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * box.length)
      newCards.push(randomCards[box[randomIndex]])
      if (box.length > 1) {
        box = box.filter((num) => { return num != box[randomIndex]})
      }      
      
    }
    
    setRandomCards(newCards);

  }

  

  const pickFace = (id) => {

    const newGirl = (
      randomCards.map((girl) => {
        if (girl.id === id) {
          if (girl.isPicked) {
            //if it's already selected, then I have to

            // 1. switch all the isPicked in the array back to false.
            // 2. Count the number of isPicked in the array.
            setClear(true);
            return {...girl, isPicked:true}
          } 
          else 
          {
            return {...girl, isPicked:true}
          }          
        } else {
          return girl
        }
      })
    )    

    let count = randomCards.length;
    let box = [];

    for (let i = 0; i < count; i++) {
      box.push(i);
    }
    
    let newCards = [];

    for (let i=0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * box.length)
      newCards.push(newGirl[box[randomIndex]])
      if (box.length > 1) {
        box = box.filter((num) => { return num != box[randomIndex]})
      }      
      
    }

    setRandomCards(newCards);   
    
    //RandomizeCards();
  }

  const checkScore = () => {

    let countHere = 0;

    randomCards.forEach((card) => {
      if (card.isPicked) countHere ++
    })         
    
    setPickedCount(countHere);
    if (countHere > highScore) {
      localStorage.setItem("Highscore", JSON.stringify(countHere))
      setHighScore(countHere)
    }
  }


  //--------------------------------------------------------------
  React.useEffect(() => {
    
    // RandomizeCards();

    let processing = true
    axiosFetchData(processing)
    return () => {
      processing = false
    }

  },[])

  //--------------------------------------------------------------

  React.useEffect(() => {
    checkScore();

  },[randomCards])

  React.useEffect(() => {

    if (isClear){
      const newOnes = (
        randomCards.map((girl) => {  
          return {...girl, isPicked:false}
        }
      )

      )

      setRandomCards(newOnes)
      setClear(false)
    }
    
    
    },[isClear])

  

  function handleAdd() {

    setMessage('')
    axiosPostData()

  }

  return (
    <>
      <div>
        <h1>Produce 101 Memory Game</h1>
      </div>
      <div>
        <h3>Get points by clicking on an image but don't click on any more than once!</h3>
        <div>
          <p>URL:</p>
          <input type="text" value={url} onChange={(e)=>setURL(e.target.value)}></input>
        </div>
        <div>
          <p>NAME:</p>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div>
          <button onClick={()=>handleAdd()}>ADD</button>
        </div>
        {message}
      </div>    
      
      
      <h1>Score: {pickedCount} / {randomCards.length}</h1>
      <h1>Highscore: {highScore}</h1>
      <div className='grid-container'>
        {randomCards.map((woman) => {
          const {id, imageURL, name, isPicked} = woman;
          return (
            <Card key={nanoid()} id={id} image={imageURL} name={name} randomCards={RandomizeCards} pickFace={pickFace} 
            isPicked={isPicked} className="grid-item"/>
            )
        })}
      </div>
    </>
  )
}






// React.useEffect(() => {

//   fetch("https://api.dictionaryapi.dev/api/v2/entries/en/karaoke")
//   .then((response) => response.json())
//   .then((data) => {
//     setWord(data[0].meanings);
//     console.log(data[0].meanings);
//   });

//   RandomizeCards();

// },[])


// {/* <h1>Here is a definition:</h1>
//       {word.map((meaning) => {
//         return <p key={nanoid()}>{meaning.definitions[0].definition}</p>;
//       })} */}
