export const getInitialTasks = (week) => ({
    [week[0].formatted]: [
      { id: "1", title: "Buy milk", done: false },
      { id: "2", title: "Feed the cat", done: true },
    ],
    [week[1].formatted]: [{ id: "3", title: "Call Mom", done: false }],
  });