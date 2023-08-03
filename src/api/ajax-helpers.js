import { BASE_URL } from "./api-keys";

export const fetchRoutines = async () => {
    try {
        const response = await fetch(`${BASE_URL}/routines`);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}
