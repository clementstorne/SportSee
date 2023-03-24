/**
 * Class representing a user.
 */
class User {
  /**
   * Creates a user.
   * @param   {Object}     data                            The data object fetched from API.
   * @param   {!Number}    data.id                         The user's id.
   * @param   {Object}     data.userInfos                  The user's personal informations.
   * @param   {!String}    data.userInfos.firstName        The user's first name.
   * @param   {!String}    data.userInfos.lastName         The user's last name.
   * @param   {!Number}    data.userInfos.age              The user's age. Must be an integer.
   * @param   {Number}     data.todayScore                 The user's score. Must be an decimal number.
   * @param   {Object}     data.keyData                    The user's nutritional values data.
   * @param   {Number}     data.keyData.calorieCount       The user's calorie value. Must be an integer.
   * @param   {Number}     data.keyData.proteinCount       The user's protein value. Must be an integer.
   * @param   {Number}     data.keyData.carbohydrateCount  The user's carbs value. Must be an integer.
   * @param   {Number}     data.keyData.lipidCount         The user's fat value. Must be an integer.
   */
  constructor(data) {
    this.userId = data.id;
    this.firstName = data.userInfos.firstName;
    this.lastName = data.userInfos.lastName;
    this.age = data.userInfos.age;
    this.score = data.todayScore || data.score;
    this.calorie = data.keyData.calorieCount;
    this.protein = data.keyData.proteinCount;
    this.carbs = data.keyData.carbohydrateCount;
    this.fat = data.keyData.lipidCount;
  }

  /**
   * Get the user's full name.
   * @return  {String}  The user's full name.
   */
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
}

export default User;
