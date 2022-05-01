export default async function getCoordinates(address: string) {
    const urlEncodedAdress = encodeURIComponent(address);
    const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const response = await fetch(`${url}${urlEncodedAdress}`);
    const result = await response.json();

    return result;
};