import { create } from "zustand";
import { Location } from "../../../infrastructure/interfaces/location";
import { clearWatchLocation, getCurrentLocation, watchCurrentLocation } from "../../../actions/location/location";

interface LocationState {
    userLocationsList:Location[];
    lastKnowLocation: Location | null;
    getLocation: () => Promise<Location | null>;
    watchLocation:()=> void;
    clearWatchLocation:()=> void;
    watchId:number| null
}


export const useLocationStore = create<LocationState>()((set, get) => ({
    lastKnowLocation: null,
    userLocationsList: [],
    watchId: null,
    watchLocation:()=>{
     const watchId = get().watchId;
     if(watchId!==null) {
        clearWatchLocation(watchId)
     };
     const id = watchCurrentLocation((location)=>{
        set({lastKnowLocation:location,userLocationsList:[...get().userLocationsList,location]})
     })
     set({watchId:id})

    },
    clearWatchLocation:()=>{
        const watchId = get().watchId;
     if(watchId!==null) {
        clearWatchLocation(watchId)
     };

    },
    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnowLocation: location });
        return location;
    }
}))