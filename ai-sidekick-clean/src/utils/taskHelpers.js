/**
 * פונקציה שפונה לאבייקט דייטה ומציגה תאריך עדכני
 * פומקציה שפונה לאובייקט טיידה ומציגה שעה עדכנית
 * 
 * function thats addresses an objet date and render current date
 * functions thats addresses an object date and render current time
 * 
 * @param {String} formatDateKey
 * @param {String} formatTimeString 
 */

export const formatDateKey = (date) => date.toISOString().split('T')[0];
export const formatTimeString = (date) => date.toTimeString().slice(0, 5);