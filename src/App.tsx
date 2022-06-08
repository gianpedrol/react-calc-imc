import { useState } from 'react';
import { isTemplateTail } from 'typescript';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import { GridItem } from './components/GridItem';
import {levels, calculateImc, Level} from './helpers/imc';
import leftArrowImage from './assets/leftarrow.png';

const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, settoShow] = useState<Level | null>(null);

  const handleCalculateButon = () => {
    if(heightField && weightField){
      settoShow(calculateImc(heightField, weightField));
    }else{
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton =() => {
    settoShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} width={150} alt="" />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
        <h1>Calcule seu IMC</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, fugiat similique quis possimus sed voluptate quisquam tempora quas sunt aliquid! Voluptas odit similique perspiciatis placeat qui quasi architecto possimus veritatis!</p>

        <input 
        type="number"
         placeholder ="Digite sua Altura. EX: 1.5 (em metros)" 
         value={heightField > 0 ? heightField : ''} 
         onChange={e => setHeightField(parseFloat(e.target.value))} 
         disabled={toShow ? true : false}
         />

        <input 
        type="number"
         placeholder ="Digite seu Peso. EX: 70.5 (em KG)" 
         value={weightField > 0 ? weightField : ''} 
         onChange={e => setWeightField(parseFloat(e.target.value))}
         disabled={toShow ? true : false}
          />

         <button onClick={handleCalculateButon}
         disabled={toShow ? true : false}
         >Calcular</button>

        </div>

        <div className={styles.rightSide}>
          {!toShow &&
        <div className={styles.grid}>
        {levels.map((item,key)=>(
          <GridItem key={key} item={item} />
        ))}
      </div>
          }
          {toShow &&
          <div className={styles.rightBig}>
            <div className={styles.rightArrow} onClick={handleBackButton}>
              <img src={leftArrowImage} alt="" width={25} />
            </div>
            <GridItem item={toShow} />
          </div>
          }

        </div>
      </div>
    </div>
  );
}

export default App;