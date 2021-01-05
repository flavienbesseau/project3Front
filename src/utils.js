/**
 * Define here generic utilitary functions.
 * Don't forget to export them explicitly at the end of the file!
 */

/**
 * Format the survey values returned by Formik to make it usable by the backend.
 *
 *
 * Original format:
 *  {
 *    "24-score": "2",
 *    "25-score": "1",
 *    "24-comment": "some interesting comment for the question of id 24",
 *    "pseudo": "Someone"
 *  }
 *
 *
 * Destination format:
 *   {
 *     "24": {
 *              id: "24",
 *              score: "1",
 *              comment: "some interesting comment for the question of id 24",
 *              pseudo: "Someone"
 *           },
 *     "25": {
 *              id: "25",
 *              score: "1",
 *              pseudo: "Someone"
 *              hospitalId: 3
 *           }
 *   }
 *
 * @param {*} formikValues An object generated by Formik that contains the values of the survey form submitted.
 * @param {*} hospitalId id of the hospital selected in presurvey.
 * @param {*} experienceId id of the experience selected in presurvey.
 * @param {*} specialtyId id of the speciality selected in presurvey.
 */
const formatResponses = (
  formikValues,
  hospitalId,
  experienceId,
  specialtyId
) => {
  const results = {};
  Object.keys(formikValues)
    .filter((key) => key !== "pseudo") // on va faire des opérations ou la clé n'est pas pseudo
    .forEach((key) => {
      const [id, type] = key.split("-"); // "24-score" devient ["24", "score"], et on stocke 24 dans la var id et score dans type
      const val = formikValues[key]; //on lit la valeur à la clé courante, "2" ici
      results[id] = results[id] || {}; // On donne les clés à l'objet results, si ca existe dejà on fait rien => ici, la clé va être l'id de la question
      results[id].id = id; // pour la 1ere clé valeur => on donne comme valeur un objet => id: "24" dans l'objet
      results[id][type] = val; // on donne dans les sous objets les types qu'on a recup ligne 36 et on donne la valeur associé => ex score: "1",
      results[id].hospitalId = hospitalId;
      results[id].experienceId = experienceId;
      results[id].specialtyId = specialtyId;
      results[id].pseudo = formikValues.pseudo; //on ajoute à result la clé valeur pseudo
    });
  return results;
};

export { formatResponses };
