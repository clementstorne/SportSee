import Performance from "./Performance";

/**
 * Class representing the user's performances.
 */
class PerformanceData {
  /**
   * Creates the user's performances data.
   * @param   {Array}     data             The data array fetched from API.
   * @param   {!Number}   data.userId      The user's id.
   * @param   {Object}    data.kind        The performance types.
   * @param   {Object[]}  data.data        The user's data.
   * @param   {!Number}   data.data.kind   The user's data performance type.
   * @param   {!Number}   data.data.value  The user's data value.
   */

  constructor(data) {
    this.performances = data.data.map(
      (performance, index) =>
        new Performance(
          this.formatLabel(data.kind[index + 1]),
          performance.value
        )
    );
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

export default PerformanceData;
