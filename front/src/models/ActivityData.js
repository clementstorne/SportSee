import Activity from "./Activity";

/**
 * Class representing the user's activity type.
 */
class ActivityData {
  /**
   * Creates the user's activity type data.
   * @param   {Array}     data             The data array fetched from API.
   * @param   {!Number}   data.userId      The user's id.
   * @param   {Object}    data.kind        The activity types.
   * @param   {Object[]}  data.data        The user's data.
   * @param   {!Number}   data.data.kind   The user's data activity type.
   * @param   {!Number}   data.data.value  The user's data value.
   */
  constructor(data) {
    for (let key in data.kind) {
      this[data.kind[key]] = new Activity(
        this.formatLabel(data.kind[key]),
        data.data.find((d) => d.kind == key).value
      );
      // this[this.formatLabel(data.kind[key])] = data.data.find(
      //   (d) => d.kind == key
      // ).value;
    }
  }

  /**
   * Translates the labels into French.
   * @param   {String}  labelToFormat  Label in English.
   * @return  {String}                 Label in French.
   */
  formatLabel(labelToFormat) {
    switch (labelToFormat) {
      case "cardio":
        return "Cardio";
      case "energy":
        return "Énergie";
      case "endurance":
        return "Endurance";
      case "strength":
        return "Force";
      case "speed":
        return "Vitesse";
      case "intensity":
        return "Intensité";
      default:
        return labelToFormat;
    }
  }
}

export default ActivityData;
