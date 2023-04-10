export class Property {
  constructor(private key: string, private value: string) {}

  public getName() {
    switch (this.key) {
      case "producer": {
        return "Производитель";
      }
      case "releaseYear": {
        return "Год релиза";
      }
      case "diagonal": {
        return "Диагональ экрана (дюйм)";
      }
      case "countryOfProducer": {
        return "Страна-производитель";
      }
      case "storage": {
        return "Объем памяти";
      }
      case "frequency": {
        return "Частота обновления экрана";
      }
      case "nfc": {
        return "NFC";
      }
      case "esim": {
        return "Поддержка ESIM";
      }
      case "wirelessCharging": {
        return "Поддержка беспроводной зарядки";
      }
      case "price": {
        return "Стоимость";
      }
    }
  }

  public getValue() {
    switch (this.key) {
      case "producer":
      case "releaseYear":
      case "countryOfProducer":
      case "nfc":
      case "esim":
      case "wirelessCharging": {
        return this.value;
      }
      case "diagonal": {
        return String(this.value).replace(".", ",");
      }
      case "storage": {
        return this.value + " Гб";
      }
      case "frequency": {
        return this.value + " Гц";
      }
      case "price": {
        return (+this.value).toLocaleString("ru") + " ₽";
      }
    }
  }
}

export type PropertyKey =
  | "producer"
  | "releaseYear"
  | "diagonal"
  | "countryOfProducer"
  | "storage"
  | "frequency"
  | "nfc"
  | "esim"
  | "wirelessCharging"
  | "price";
