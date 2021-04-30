import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';

export interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  hour: string;
  frequency: {
    times: number;
    repeat_every: string;
  }
  dateTimeModification: Date;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationID: string;
  }
}

export async function savePlant(plant: PlantProps):Promise<void> {
  try{
    const nextTime = new Date(plant.dateTimeModification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if(repeat_every == 'week'){
      const interval = Math.trunc(7/times);
      nextTime.setDate(now.getDate() + interval);
    }
    else{
      nextTime.setDate(nextTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime())/1000)
    );

    const notificationID = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      }
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? JSON.parse(data) as StoragePlantProps : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationID
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants', 
      JSON.stringify({...newPlant, ...oldPlants})
    );
  }catch(err){
    throw new Error(err)
  }
}

export async function loadPlants():Promise<PlantProps[]> {
  try{
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? JSON.parse(data) as StoragePlantProps : {};

    const plantsSorted = Object
      .keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(new Date(plants[plant].data.dateTimeModification), 'HH:mm')
        }
      }).sort((a, b) => 
        Math.floor(new Date(a.dateTimeModification).getTime()/1000 - 
        Math.floor(new Date(b.dateTimeModification).getTime())/1000)
      );

    return plantsSorted; 

  }catch(err){
    throw new Error(err)
  }
}

export async function removePlants(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationID);
  delete plants[id];

  await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));

}