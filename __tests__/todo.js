/* eslint-disable no-undef */
const todolist = require("../todo");
const { all, markAsComplete, add } = todolist();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Edit Trip Videos",
      completed: false,
      dueDate: today,
    });
  });

  test("Should add a new todo", () => {
    let todoItemsCount = all.length;

    add({
      title: "Call Shiva",
      completed: false,
      dueDate: yesterday,
    });

    add({
      title: "Visit Hospital",
      completed: false,
      dueDate: tomorrow,
    });

    expect(all.length).toBe(todoItemsCount + 2);
  });

  test("Mark a todo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Check Retrieval of Overdue Items", () => {
    expect(all[1].dueDate).toBe(yesterday);
  });

  test("Check Retrieval of Due Today Items", () => {
    expect(all[0].dueDate).toBe(today);
  });

  test("Check Retrieval of Due Later Items", () => {
    expect(all[2].dueDate).toBe(tomorrow);
  });
});
