import { enumToOptions } from "../guard/kendo/enumToArray";


export const booleanEnum = [
  { text: "Aktif", value: false },
  { text: "Pasif", value: true },
];

export enum TemplateType {
  Technical = "Kapı girişlerinde barkod okutarak giriş kontrolü yapılmıştır.",
  Participation = "Kapı girişlerinde biletlerin koçanları kopartılarak misafirlerimize bileklik takılmıştır",
  Organizer = "Bilet kontrolü koçan kopartılarak yapılmıştır.",
  FreeEvent = "Biletsiz/Ücretsiz Etkinlik",
}
export const templateOptions = Object.entries(TemplateType).map(([key, value]) => ({
  id: key,
  name: value,
}));

export enum AreaPreset {
  Standing = "Ayakta",
  Invited = "Davetli",
  General = "Genel",
  YourSeat = "Koltuk Senin",
  Sitting = "Oturma",

}
export const areaOptions = Object.entries(AreaPreset).map(([key, value]) => ({
  id: key,
  name: value,
}));




