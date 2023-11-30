export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

interface Name {
  firstname: string;
  lastname: string;
}
interface Address {
  city: string;
  street: string;
  zipcode: string;
  number: number;
  geolocation: Geolocation;
}

interface Geolocation {
  lat: string;
  long: string;
}
