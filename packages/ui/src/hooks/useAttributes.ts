import { useEffect, useState } from 'react';

interface IAttributes {
  hungerAmount: number;
  ageAmount: number;
  energyAmount: number;
  healthAmount: number;
  happinessAmount: number;
}

const useAttributes = ({
  hungerAmount,
  ageAmount,
  energyAmount,
  healthAmount,
  happinessAmount,
}: IAttributes) => {
  const [hunger, setHunger] = useState(hungerAmount);
  const [age, setAge] = useState(ageAmount);
  const [energy, setEnergy] = useState(energyAmount);
  const [health, setHealth] = useState(healthAmount);
  const [happiness, setHappiness] = useState(happinessAmount);
  const [isSleeping, setIsSleeping] = useState(false);

  const eat = () => {
    setHunger(10);
    setHappiness(happiness + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSleeping) {
        handleHunger();
        handleHealthIncrease();
        handleEnergyReduce();
        handleHappinessReduce();
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [hunger, health, energy, isSleeping]);

  const sleep = () => {
    setIsSleeping(true);
    setTimeout(() => {
      setEnergy(10);
      setIsSleeping(false);
    }, 7000);
    return;
  };

  const handleHappinessReduce = () => {
    if (happiness > 0) {
      setHappiness(happiness - 2);
    }
  };

  const handleEnergyReduce = () => {
    if (energy > 0) {
      setEnergy(energy - 1);
    }
  };

  const handleHealthReduce = () => {
    if (health > 0) {
      setHealth(health - 1);
      setHappiness(happiness - 1);
    }
  };

  const handleHealthIncrease = () => {
    if (health < 10 && hunger > 0) {
      setHealth(health + 1);
    }
  };

  const handleHunger = () => {
    if (hunger > 0) {
      setHunger(hunger - 1);
    }
    if (hunger === 0) {
      handleHealthReduce();
    }
  };

  const play = () => {
    if (happiness < 10) {
      setHappiness(happiness + 5);
    }
  };

  return {
    hunger,
    age,
    energy,
    health,
    happiness,
    eat,
    sleep,
    play,
  };
};

export default useAttributes;
