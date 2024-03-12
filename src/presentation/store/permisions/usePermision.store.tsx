import { create } from "zustand";
import { PermissionStatus } from "../../../infrastructure/interfaces/permisions";
import { checkLocationPermission, requestLocationPermission } from "../../../actions/permisions/location";

interface PermissionState {
    locationStatus: PermissionStatus;
    requestLocationPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionStore = create<PermissionState>()(set => ({
    locationStatus: 'undeterminated',
    checkLocationPermission : async () => {
        const status = await checkLocationPermission();
        console.log(status);
        set({ locationStatus: status });
        return status;
    },
    requestLocationPermission: async () => {
        const status = await requestLocationPermission();
        set({ locationStatus: status });
        return status;
    }
})
)