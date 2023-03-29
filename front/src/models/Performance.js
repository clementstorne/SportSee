/**
 * Class representing a performance.
 */
class Performance {
  /**
   * Creates a performance.
   * @param   {String}  kind   The label of the performance.
   * @param   {Number}  value  The value of the performance.
   */
  constructor(kind, value) {
    this.axis = kind;
    this.value = value;
  }
}

export default Performance;
