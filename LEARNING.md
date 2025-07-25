# 🧠 Development Journal – AI Sidekick

תיעוד תהליך הפיתוח, הרעיונות, השינויים והלקחים שנצברים לאורך הדרך.

---

## 📅 14.04.2025 – התחלה מסודרת

- פתיחת פרויקט ותיעוד ראשוני
- ייבוא קבצי הפרויקט הקיימים והבנת המבנה
- יצירת README מסודר כולל קרדיט לצ׳אטג׳יפיטי
- שיחה על פרטיות, שימוש ב־Expo, והבדלים בין צד שלישי לפיתוח עצמאי
- הבנה שהשלב הנוכחי לא כולל תלות בשירותים חיצוניים לדאטה
- בעיה עיצובית בטבלת HTML (המיכל לא מיושר נכון)
- זיהוי בעיה נוספת: מעבר בין תצוגת שבוע לתצוגת חודש לא מתפקד חלק, כנראה רצינו לעשות מעבר אנימטיבי (כמו scroll או zoom out) אבל משהו לא עבד — דורש בדיקה בעתיד

---

## 📅 15.04.2025 – התחלת סידור קומפוננטות ואחריותן

- פתיחת קומפוננטת הצגת שבוע (`WeekView`)
- הפרדת קומפוננטת רשימת משימות יומיות (`TaskList`)
- מחיקת קובץ `HomeScreen.js` בגלל התנגשות עם הלוגיקה החדשה של סימון משימות
- הפרדת קבצי עיצוב (`*.styles.js`) מקבצי קומפוננטה – כדי לנקות את הקוד ולהפריד אחריות
- תיקוני ייבוא בין אותיות קטנות וגדולות במערכת קבצים רגישת רישיות
- הבנה שנשאיר את העיצוב הכללי (`container`, `title`, `subTitle`) בתוך `App.js`, כי הוא שייך למבנה הכללי של המסך

---

## 📅 16.04.2025 – הוספת ניווט ותפריט עליון חכם

- יצירת מערכת ניווט (`AppNavigator`) עם `react-navigation`
- שימוש ב־`GestureHandlerRootView` לעטיפת האפליקציה כולה
- הגדרת שני מסכים: `Home` (שבוע) ו־`Calendar` (חודש)
- פיתוח קומפוננטת `HeaderDropdown` ככותרת אינטראקטיבית עם תפריט נפתח מתוך ה־header
- תיקון לולאות רינדור שנגרמו משימוש שגוי ב־`setVisible(true)` בתוך `onPress`
- חלוקת הקוד של `HeaderDropdown` לקובץ עיצוב נפרד (`headerDropdown.styles.js`)
- שיפור UX של הלחיצה על ההדר כולו (באמצעות `Pressable`, `hitSlop`, ו־רקע שקוף)
- ביטול כפתור ניווט ישיר מתוך המסך הראשי כדי לא לבלבל עם הכותרת החדשה
- עיצוב התפריט כך שייפתח בפינה העליונה הימנית עם מראה מודרני ונוח ללחיצה
- ⚠️ התפריט עדיין לא נפתח בצורה חלקה ונוחה — יש לבצע בדיקה נוספת לשיפור מיקום/תגובה של ה־Modal

---

## 📅 18.04.2025 – תיקוני Web, מסך לבן, ודוקומנטציה מסודרת

- פתרון בעיית **המסך הלבן בדפדפן**:  
  ה־`index.js` השתמש ב־`AppRegistry.registerComponent`, מה שמתאים ל־Android/iOS בלבד.  
  החלפנו ל־`registerRootComponent` מ־`expo`, שמרנדר גם ל־Web כראוי.

- טיפול בשגיאת ייבוא שגרמה ל־**Web bundling failed**:  
  הקובץ `headerDropdown.styles.js` ניסה לייבא `./theme` במקום הנתיב הנכון (`../../styles/theme`), מה שגרם לבילד ליפול.  
  סרקנו את כל הקבצים ואיתרנו את כל ה־imports השגויים ותיקנו אותם.

- ווידוא שהאפליקציה עדיין עובדת גם על **מכשיר נייד** אחרי השינויים –  
  הבנו ש־`registerRootComponent` תומך בכל הפלטפורמות ואין צורך לשנות כלום עבור mobile.

- תיקון משמעותי ל־**README.md**:  
  שדרוג עץ התיקיות, תיקון מידע לא עדכני (כמו מיקום `App.js`, מחיקת `HomeScreen.js`, תוספת `styles/`, שימוש ב־registerRootComponent במקום AppRegistry).

- עדכון קובץ **LEARNING.md** לפורמט נוח, אחיד ומוכן להמשך תיעוד.

- קיבלת עותק מוכן-להדבקה של שניהם, כולל בלוקים ב־Markdown בדיוק כמו שרצית – בלי חפירות 😄

---

## 📅 12.05.2025 – התחברות, Redux וניווט מבוסס הרשאות

- הוספת מסך Login עם אימות שדות והתחברות מזויפת (`fakeLogin`)
- שימוש ב־Redux לניהול סטייט של התחברות (`authSlice`)
- החלפת ה־AppNavigator כך שיציג את מסך ההתחברות אם המשתמש לא מחובר
- הוספת ניווט ל־Home במסך ההתחברות לאחר התחברות מוצלחת
- טיפול בשגיאות התחברות והצגת הודעת שגיאה ידידותית למשתמש
- שגיאה קטנה תוקנה: שימוש במשתנה `error` לפני שהוגדר
- הכנה להוספת הגנה על מסכים ודפי משתמש (protected routes)

---

## 📅 ימים עתידיים

_כאן נוכל להוסיף כל פעם שאתה מתקדם בעוד משהו. הנה תבנית לדוגמה:_

## 📅 DD.MM.YYYY – כותרת קצרה

- מה נוסה
- מה עבד / מה נשבר
- החלטות להמשך

---

## 🧭 רעיון להמשך:

אנימציה של מעבר חלק בין מסך ראשי (שבוע) למסך משני של רשת חודשית — יישום באמצעות `react-native-reanimated` או דרך ניווט עם `react-navigation`.
